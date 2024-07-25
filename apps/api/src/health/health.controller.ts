import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HealthCheck,
  HealthCheckError,
} from '@nestjs/terminus';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DB_CONNECTION } from 'src/drizzle.module';
import { sql } from 'drizzle-orm';
import schema from 'db/schema';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(
    private health: HealthCheckService,
    @Inject(DB_CONNECTION) private db: PostgresJsDatabase<typeof schema>
  ) { }

  @Get()
  @Public()
  @HealthCheck()
  @ApiOperation({ summary: 'Is the service healthy' })
  check() {
    return this.health.check([
      //   () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
      // https://stackoverflow.com/questions/4569956/ping-a-mysql-server
      async () => {
        try {
          await this.db.execute(sql`/* ping */ SELECT 1`);
        } catch (error) {
          this.logger.error(error);
          throw new HealthCheckError('Postgres ping check failed', {
            postgres: {
              status: 'down',
            },
          });
        }

        return {
          postgres: {
            status: 'up',
          },
        };
      },
    ]);
  }
}
