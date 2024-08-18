import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AccessToken } from './types/access-token';
import { ConfigService } from '@nestjs/config';
import { RefreshToken } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(email: string, password: string, rememberMe = false) {
    const {
      id,
      password: hashedPassword,
      ...user
    } = (await this.usersService.findOneByEmail(email, true)) ?? {};

    if (user == undefined || id == undefined || hashedPassword == undefined) {
      throw new NotFoundException('Incorrect username or password');
    }

    const isMatch = await compare(password, hashedPassword.toString());

    if (isMatch == undefined) {
      throw new NotFoundException('Incorrect username or password');
    }

    return {
      idToken: await this.jwtService.signAsync({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }),
      accessToken: await this.generateAccessToken({ sub: id }),
      refreshToken: await this.generateRefreshToken(id, rememberMe),
    };
  }

  async register(email: string, password: string) {
    const existingUser = await this.usersService.findOneByEmail(email);

    if (existingUser) {
      throw new BadRequestException('email already exists');
    }

    const hashedPassword = await hash(password, 12);
    const id = await this.usersService.create({
      email,
      password: Buffer.from(hashedPassword),
    });

    return {
      idToken: await this.jwtService.signAsync({ email }),
      accessToken: await this.generateAccessToken({ sub: id }),
      refreshToken: await this.generateRefreshToken(id),
    };
  }

  // Generates only a new access token
  async refreshAccessToken(jwt?: string) {
    // TODO: Eventually move most of this to a RefreshGuard
    if (jwt == undefined) throw new ForbiddenException();

    let result: RefreshToken | undefined = undefined;
    try {
      result = await this.jwtService.verifyAsync<RefreshToken>(jwt, {
        secret: this.configService.getOrThrow('REFRESH_TOKEN_SECRET'),
      });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }

    if (result == undefined) throw new ForbiddenException();

    const { id } = (await this.usersService.findOneById(result.sub)) ?? {};

    if (id == undefined) throw new ForbiddenException();

    return this.generateAccessToken({ sub: id });
  }

  private generateRefreshToken(userId: string, rememberMe?: boolean) {
    // TODO: Eventually add invalidation to this via DB or redis
    return this.jwtService.signAsync(
      {
        sub: userId,
      },
      {
        expiresIn: this.configService.getOrThrow(
          rememberMe
            ? 'REFRESH_TOKEN_REMEMBER_ME_EXPIRES_IN'
            : 'REFRESH_TOKEN_EXPIRES_IN',
        ),
        secret: this.configService.getOrThrow('REFRESH_TOKEN_SECRET'),
      },
    );
  }

  private generateAccessToken = (payload: AccessToken) =>
    this.jwtService.signAsync(payload);
}
