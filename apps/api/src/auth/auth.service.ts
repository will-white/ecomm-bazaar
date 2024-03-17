import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
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
    private readonly configService: ConfigService
  ) {}

  async login(email: string, password: string) {
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

    const payload: AccessToken = { sub: id };

    return {
      idToken: await this.jwtService.signAsync(
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        { expiresIn: 60 * 60 * 24 * 7 }
      ),
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: 60 * 5,
      }),
      refreshToken: await this.generateRefreshToken(id),
    };
  }

  async register(email: string, password: string) {
    const existingUser = await this.usersService.findOneByEmail(email);

    if (existingUser) {
      throw new BadRequestException('email already exists');
    }

    const hashedPassword = await hash(password, 12);
    const result = await this.usersService.create({
      email,
      password: hashedPassword,
    });
    const payload: AccessToken = { sub: result };

    return {
      idToken: await this.jwtService.signAsync(
        { email },
        { expiresIn: 60 * 60 * 24 * 7 }
      ),
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: 60 * 5,
      }),
      refreshToken: await this.generateRefreshToken(result),
    };
  }

  // Generates only a new access token
  async refreshAccessToken(jwt?: string) {
    // Eventually move most of this to a RefreshGuard
    if (jwt == undefined) throw new ForbiddenException();

    const result = await this.jwtService.verifyAsync<RefreshToken>(jwt);
    const { id } = (await this.usersService.findOneById(result.sub)) ?? {};

    if (id == undefined) throw new ForbiddenException();

    const payload: AccessToken = { sub: id };

    return this.jwtService.signAsync(payload);
  }

  generateRefreshToken(userId: string) {
    // TODO: Eventually add invalidation to this via DB or redis
    return this.jwtService.signAsync(
      {
        sub: userId,
      },
      {
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
        // TODO: rememberMe increasing login duration
        expiresIn: this.configService.get(
          'JWT_REFRESH_EXPIRE_DEFAULT_DURATION'
        ),
      }
    );
  }
}
