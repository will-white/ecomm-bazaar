import 'dotenv/config';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import schema from 'db/schema';
import config from '../drizzle.config';
import postgres from 'postgres';

const main = async () => {
  const connection = postgres({
    host: process.env.PGHOST,
    max: 1
  });

  const db = drizzle(connection, { schema });

  // This will run migrations on the database, skipping the ones already applied
  await migrate(db, { migrationsFolder: config.out });
  // Don't forget to close the connection, otherwise the script will hang
  await connection.end();
};

void main();
