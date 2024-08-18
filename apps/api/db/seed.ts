import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import schema from 'db/schema';
import users from './seeds/user';
import userProfiles from './seeds/userProfiles';
import postgres from 'postgres';

const main = async () => {
  const connection = postgres({ host: process.env.PGHOST });

  const db = drizzle(connection, { schema });

  for (const user of users) {
    await db.insert(schema.user).values(user);
  }

  for (const profile of userProfiles) {
    await db.insert(schema.userProfile).values(profile);
  }

  // Don't forget to close the connection, otherwise the script will hang
  await connection.end();
};

void main();
