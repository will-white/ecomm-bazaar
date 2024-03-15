import { sql } from 'drizzle-orm';
import { mysqlTable, varchar, timestamp, binary } from 'drizzle-orm/mysql-core';

const auditingColumns = {
  // Until https://github.com/drizzle-team/drizzle-orm/pull/1114 is merged do sql'current_timestamp'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  createdBy: varchar('created_by', { length: 48 }),
  modifiedAt: timestamp('modified_at').defaultNow().onUpdateNow().notNull(),
  modifiedBy: varchar('modified_by', { length: 48 }),
};

export const user = mysqlTable('user', {
  id: varchar('id', { length: 48 })
    .default(sql`(UUID())`)
    .primaryKey(),
  email: varchar('email', { length: 320 }).notNull(),
  password: binary('password', { length: 60 }).notNull(),
  firstName: varchar('first_name', { length: 48 }),
  lastName: varchar('last_name', { length: 48 }),
  ...auditingColumns,
});

// export const userRelations = relations(user, ({ many, one }) => ({
//   address: many(address),
//   user: one(user),
// }));

// export const address = mysqlTable('address', {
//   id: int('id').primaryKey().autoincrement(),
//   userId: varchar('id', { length: 48 }).notNull(),
//   default: boolean('default').notNull(),
//   fullName: varchar('full_name', { length: 256 }).notNull(),
//   address: varchar('address', { length: 256 }).notNull(),
//   address2: varchar('address2', { length: 256 }).notNull(),
//   zipCode: varchar('zip_code', { length: 24 }).notNull(),
//   city: varchar('city', { length: 32 }).notNull(),
//   state: varchar('state', { length: 32 }).notNull(),
// });

// export const addressRelations = relations(address, ({ one }) => ({
//   clause: one(user, {
//     fields: [address.userId],
//     references: [user.id],
//   }),
// }));

export default {
  user,
};
