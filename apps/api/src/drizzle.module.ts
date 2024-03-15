import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/mysql2';
import { createPool } from 'mysql2';
import { ConfigModule, ConfigService } from '@nestjs/config';
import schema from 'db/schema';

export const DB_CONNECTION = 'drizzleProvider';

// Eventually test out streaming
// https://github.com/drizzle-team/drizzle-orm/issues/872

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DB_CONNECTION,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const connection = createPool({
          host: configService.get<string>('DB_HOST'),
          database: configService.get<string>('DB_NAME'),
          user: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
        });

        return drizzle(connection, { schema, mode: 'default', logger: true });
      },
    },
  ],
  exports: [DB_CONNECTION],
})
export class DrizzleModule {}
