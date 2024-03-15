import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import schema from 'db/schema';
import * as mysql from 'mysql2/promise';
import users from './seeds/user';

const main = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });

  const db = drizzle(connection, { schema, mode: 'default' });

  for (const user of users) {
    await db.insert(schema.user).values(user);
  }

  // Don't forget to close the connection, otherwise the script will hang
  await connection.end();
};

void main();
