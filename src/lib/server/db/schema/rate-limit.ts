import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export type RateLimit = typeof rateLimit.$inferSelect;

export const rateLimit = sqliteTable('rate_limit', {
	id: text('id').primaryKey(),
	key: text('key'),
	count: integer('count'),
	lastRequest: integer('last_request')
});
