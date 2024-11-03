import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export type User = typeof user.$inferSelect;

export const user = sqliteTable('user', {
	id: integer('id').primaryKey(),
	email: text('email').notNull(),
	password: text('password').notNull()
});
