import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AccessToken } from '../types/access-token';
import { FastifyRequest } from 'fastify';

const cookieExtractor = (req: FastifyRequest) => {
  return req?.cookies ? req.cookies.token : undefined;
};

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(
  Strategy,
  'jwt-cookie',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: configService.get<string | undefined>('JWT_SECRET'),
    });
  }

  validate(payload: AccessToken) {
    return payload;
  }
}
