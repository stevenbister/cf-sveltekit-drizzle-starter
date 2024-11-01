import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export type Example = typeof example.$inferSelect;

export const example = sqliteTable('example', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	createdAt: text('created_at')
		.notNull()
		.default(sql`(current_timestamp)`)
});
