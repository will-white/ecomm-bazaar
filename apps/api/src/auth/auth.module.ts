import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { DrizzleModule } from 'src/drizzle.module';
import { JwtCookieStrategy } from './strategies/jwt-cookie.strategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('ACCESS_TOKEN_SECRET'),
        verifyOptions: {
          issuer: configService.getOrThrow('JWT_ISSUER'),
          clockTolerance: configService.get('JWT_SKEW_IN_SECONDS'),
        },
        signOptions: {
          issuer: configService.getOrThrow('JWT_ISSUER'),
          expiresIn: configService.getOrThrow('ACCESS_TOKEN_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
    DrizzleModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtCookieStrategy],
})
export class AuthModule {}
