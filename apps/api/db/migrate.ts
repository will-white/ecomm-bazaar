import 'dotenv/config';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { drizzle } from 'drizzle-orm/mysql2';
import schema from 'db/schema';
import * as mysql from 'mysql2/promise';
import config from '../drizzle.config';

const main = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });

  const db = drizzle(connection, { schema, mode: 'default' });

  // This will run migrations on the database, skipping the ones already applied
  await migrate(db, { migrationsFolder: config.out });
  // Don't forget to close the connection, otherwise the script will hang
  await connection.end();
};

void main();
