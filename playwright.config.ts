import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: 'e2e',
	use: {
		baseURL: 'http://localhost:8788'
	},
	webServer: {
		command: 'pnpm preview',
		port: 8788
	}
});
