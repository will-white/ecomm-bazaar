import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JwtGuard } from './auth/guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { ListingsModule } from './listings/listings.module';

@Module({
  imports: [ConfigModule.forRoot(),
    HealthModule, AuthModule, UsersModule, ListingsModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
