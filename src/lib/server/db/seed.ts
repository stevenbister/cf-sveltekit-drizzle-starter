import type { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import type { drizzle as drizzleD1 } from 'drizzle-orm/d1';

import { mockUser } from '../../../../mocks/user';
import * as schema from './schema';

export type DrizzleD1 = ReturnType<typeof drizzleD1<typeof schema>>;
export type DrizzleSqlite = ReturnType<typeof drizzleSqlite<typeof schema>>;

export const seed = async (db: DrizzleD1 | DrizzleSqlite) => {
	await clearTables(db);

	console.log('Seeding data 🌱');

	await insertData(db);

	console.log('Seeding complete 🌱');
};

const insertData = async (db: DrizzleD1 | DrizzleSqlite) => {
	const schemas = [
		{
			schema: schema.user,
			data: mockUser
		}
	];

	for (const { schema, data } of schemas) await db.insert(schema).values(data);
};

export const clearTables = async (db: DrizzleD1 | DrizzleSqlite) => {
	console.log('Resetting tables 🗑️');

	for (const key of Object.keys(schema)) await db.delete(schema[key as keyof typeof schema]);

	console.log('Tables reset 🗑️');
};
