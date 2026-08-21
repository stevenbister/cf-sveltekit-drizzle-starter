import { expect, test } from '@playwright/test';

test.describe('demo', { tag: '@smoke' }, () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('home page has expected h1', async ({ page }) => {
		await expect(page.getByRole('heading', { level: 1 })).toHaveText('Welcome to SvelteKit');
	});

	test('home page lists our tasks', async ({ page }) => {
		await expect(page.getByText('Demo')).toBeInViewport();
	});
});
