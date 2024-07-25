import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import schema from 'db/schema';
import users from './seeds/user';
import postgres from 'postgres';

const main = async () => {
  const connection = postgres({ host: process.env.PGHOST });

  const db = drizzle(connection, { schema });

  for (const user of users) {
    await db.insert(schema.user).values(user);
  }

  // Don't forget to close the connection, otherwise the script will hang
  await connection.end();
};

void main();
