import { Inject, Injectable, Logger } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DB_CONNECTION } from 'src/drizzle.module';
import schema, { user, userProfile } from 'db/schema';
import { eq } from 'drizzle-orm';
import { PersonalInfoDto } from './dtos/personal-info.dto';

@Injectable()
export class PersonalInfoService {
  private readonly logger = new Logger(PersonalInfoService.name);

  constructor(
    @Inject(DB_CONNECTION) private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async findOneById(id: string): Promise<Partial<PersonalInfoDto> | undefined> {
    const info = await this.db
      .select({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dob: userProfile.dob,
        country: userProfile.country,
        language: userProfile.language,
      })
      .from(userProfile)
      .innerJoin(user, eq(user.id, id))
      .limit(1);

    if (info == null || info.length > 1) return undefined;

    const firstValue = info[0];

    return {
      ...firstValue,
      email: firstValue.email ?? undefined,
    };
  }

  async update(id: string, dto: Partial<PersonalInfoDto>) {
    const { email, firstName, lastName, ...userProfile } = dto;

    await this.db.update(schema.user).set({
      email,
      firstName,
      lastName,
    });

    return await this.db
      .update(schema.userProfile)
      .set(userProfile)
      .where(eq(schema.user.id, id));
  }
}
