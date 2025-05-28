import { seed } from './src/lib/server/db/seed';
import { testDB } from './src/lib/server/db/test/test-adapter';

export default async function setup() {
	console.log('Running global setup for Vitest...');
	await seed(testDB);
}
