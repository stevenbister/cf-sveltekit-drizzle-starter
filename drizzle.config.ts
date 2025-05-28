import { defineConfig } from 'drizzle-kit';

const getLocalDB = () => {
	if (process.env.NODE_ENV === 'test') return './src/lib/server/db/test/test.db';

	return process.env.LOCAL_D1_DB;
};

export default defineConfig({
	schema: './src/lib/server/db/schema/*.ts',
	out: './drizzle/migrations',
	verbose: true,
	strict: true,
	dialect: 'sqlite',
	...(process.env.NODE_ENV === 'production' || process.env.CI
		? {
				driver: 'd1-http',
				dbCredentials: {
					accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
					databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
					token: process.env.CLOUDFLARE_D1_TOKEN!
				}
			}
		: {
				dbCredentials: {
					url: getLocalDB()
				}
			})
});
