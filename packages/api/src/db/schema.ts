import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email').unique().notNull(),
    userName: varchar('username').unique().notNull(),
    firstName: varchar('first_name'),
    lastName: varchar('last_name')
});

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
