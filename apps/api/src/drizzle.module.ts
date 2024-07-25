import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import schema from 'db/schema';
import postgres = require('postgres');

export const DB_CONNECTION = 'drizzleProvider';

// TODO: Eventually test out streaming
// https://github.com/drizzle-team/drizzle-orm/issues/872

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DB_CONNECTION,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const connection = postgres({
          host: configService.get<string>('PGHOST'),
        });

        return drizzle(connection, { schema, logger: true });
      },
    },
  ],
  exports: [DB_CONNECTION],
})
export class DrizzleModule {}
