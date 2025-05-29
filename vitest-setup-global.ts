import { seed } from './src/server/db/seed';
import { testDB } from './src/server/db/test/test-adapter';

export default async function setup() {
	console.log('Running global setup for Vitest...');
	await seed(testDB);
}
