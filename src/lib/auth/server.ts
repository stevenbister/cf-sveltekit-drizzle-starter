import { betterAuth } from 'better-auth';
import type { DB } from 'better-auth/adapters/drizzle';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { hashPassword, verifyPassword } from './password';

export const getAuth = (db: DB) => {
	if (!db) throw new Error('DB is required');

	return betterAuth({
		database: drizzleAdapter(db, {
			provider: 'sqlite'
		}),
		session: {
			cookieCache: {
				enabled: true,
				maxAge: 5 * 60 // Cache duration in seconds
			}
		},
		emailAndPassword: {
			enabled: true,
			password: {
				hash: hashPassword,
				verify: verifyPassword
			}
		},
		rateLimit: {
			storage: 'database',
			modelName: 'rateLimit'
		}
	});
};
