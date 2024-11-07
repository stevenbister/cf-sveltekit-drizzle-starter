import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: 'e2e',
	projects: [
		{
			name: 'setup',
			testMatch: /.*\.setup\.ts/
		},
		{
			name: 'tests',
			use: {
				storageState: 'playwright/.auth/session.json'
			},
			dependencies: ['setup']
		}
	],
	use: {
		baseURL: process.env.CI ? process.env.PLAYWRIGHT_TEST_BASE_URL : 'http://localhost:8788'
	},
	webServer: process.env.CI
		? undefined
		: {
				command: 'pnpm preview',
				port: 8788
			}
});
