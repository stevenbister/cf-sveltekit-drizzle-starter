import { error } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/d1';

import * as schema from './schema';

export type DBType = App.Platform['env']['DB'];
export type DbClient = ReturnType<typeof drizzle>;

export class Database {
	private static instance: DbClient | null = null;
	private static DB: DBType | undefined;

	private constructor() {}

	public static initialize(DB: DBType | undefined): DbClient {
		if (!Database.instance) {
			Database.DB = DB;

			if (!Database.DB) return error(500, 'Cloudflare D1 binding not found');

			Database.instance = drizzle(Database.DB, {
				schema
			});
		}
		return Database.instance;
	}

	public static getInstance(): DbClient {
		if (!Database.instance) {
			return error(
				500,
				'Database has not been initialized. Call Database.initialize(platform) first.'
			);
		}

		return Database.instance;
	}
}
