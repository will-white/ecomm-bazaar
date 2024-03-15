import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { DrizzleModule } from 'src/drizzle.module';

@Module({
  imports: [
    TerminusModule.forRoot({
      // https://docs.nestjs.com/recipes/terminus#graceful-shutdown-timeout
      gracefulShutdownTimeoutMs: 1000,
    }),
    DrizzleModule,
  ],
  controllers: [HealthController],
})
export class HealthModule {}
