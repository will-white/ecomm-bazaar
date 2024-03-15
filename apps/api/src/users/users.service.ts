import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { DB_CONNECTION } from 'src/drizzle.module';
import schema from 'db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @Inject(DB_CONNECTION) private db: MySql2Database<typeof schema>
  ) {}

  async create(dto: CreateUserDto) {
    const table = await this.db.insert(schema.user).values(dto);

    this.logger.log(table[0].insertId);
    const test = table[1];
    this.logger.log(test);

    return randomUUID();
  }

  async findAll() {
    this.logger.warn('This is a warning');
    try {
      throw new Error('Test');
    } catch (error) {
      this.logger.error('This is a error');
    }

    return await this.db.query.user.findMany({
      // where:
    });
  }

  async findOneByEmail(
    email: string,
    includePassword = false
  ): Promise<Partial<typeof schema.user.$inferInsert> | undefined> {
    return await this.db.query.user.findFirst({
      where: eq(schema.user.email, email),
      columns: includePassword ? undefined : { password: false },
    });
  }

  async findOneById(
    id: string
  ): Promise<Partial<typeof schema.user.$inferInsert> | undefined> {
    return await this.db.query.user.findFirst({
      where: eq(schema.user.id, id),
      columns: {
        password: false,
      },
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    return await this.db
      .update(schema.user)
      .set(dto)
      .where(eq(schema.user.id, id));
  }

  async remove(id: string) {
    return await this.db.delete(schema.user).where(eq(schema.user.id, id));
  }
}
