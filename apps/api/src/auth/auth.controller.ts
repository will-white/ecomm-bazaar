import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from '../common/decorators/public.decorator';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';
import { LoginDto } from './dtos';

@Public()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiCreatedResponse({ description: 'Logged in' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiBody({ type: LoginDto }) // '{ "email": "test@test.invalid"\, "password": "12345" }'
  @ApiOperation({ summary: 'Login' })
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() req: LoginDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const { idToken, accessToken, refreshToken } = await this.authService.login(
      req.email,
      req.password,
      req.rememberMe,
    );

    void response.setCookie('token', accessToken, {
      maxAge: 300,
      path: '/',
      httpOnly: true, // ensure the cookie will not be exposed
      // secure: true,      // set this in production to ensure HTTPS
      // sameSite: 'none',
      // sameOrigin: 'none' // set this in production if the server is separate domain
    });

    void response.setCookie('X-Refresh-Token', refreshToken, {
      // TODO: Figure out cookie maxAge along with refresh token expire duration
      maxAge: 900,
      path: '/',
      httpOnly: true, // ensure the cookie will not be exposed
      // secure: true,      // set this in production to ensure HTTPS
      // sameSite: 'none',
      // sameOrigin: 'none' // set this in production if the server is separate domain
    });

    return { idToken };
  }

  @Post('register')
  @ApiCreatedResponse({ description: 'Registered user' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiOperation({ summary: 'Register' })
  async register(
    @Body() req: { email?: string; password?: string; rememberMe?: boolean },
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const { idToken, accessToken, refreshToken } =
      await this.authService.register(req.email ?? '', req.password ?? '');

    void response.setCookie('token', accessToken, {
      maxAge: 300,
      path: '/',
      httpOnly: true, // ensure the cookie will not be exposed
      // secure: true,      // set this in production to ensure HTTPS
      // sameSite: 'none',
      // sameOrigin: 'none' // set this in production if the server is separate domain
    });

    void response.setCookie('X-Refresh-Token', refreshToken, {
      maxAge: 900,
      path: '/',
      httpOnly: true, // ensure the cookie will not be exposed
      // secure: true,      // set this in production to ensure HTTPS
      // sameSite: 'none',
      // sameOrigin: 'none' // set this in production if the server is separate domain
    });

    return { idToken };
  }

  // TODO: RefreshTokenGuard to check if Refreshtoken is good/valid
  @Get('refresh')
  @ApiOperation({ summary: 'Refresh Tokens' })
  async refresh(
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const refreshToken = request.cookies['X-Refresh-Token'];
    const accessToken = await this.authService.refreshAccessToken(refreshToken);

    void response.setCookie('token', accessToken, {
      maxAge: 300,
      path: '/',
      httpOnly: true, // ensure the cookie will not be exposed
      // secure: true,      // set this in production to ensure HTTPS
      // sameSite: 'none',
      // sameOrigin: 'none' // set this in production if the server is separate domain
    });

    return { accessToken };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  logout(@Res({ passthrough: true }) response: FastifyReply) {
    void response.clearCookie('X-Refresh-Token');
    void response.clearCookie('token');
  }
}
