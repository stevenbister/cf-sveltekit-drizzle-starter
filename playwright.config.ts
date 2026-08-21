import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: process.env.CI ? 1 : undefined,
	webServer: { command: 'npm run build && npm run preview', port: 4173 },
	testDir: 'e2e'
});
