import { expect, test } from '@playwright/test';

import { mockUser } from '$mocks/user';

test.describe('logged in', () => {
	test('home page has username in heading when logged in', async ({ page }) => {
		await page.goto('/');

		await expect(
			page.getByRole('heading', {
				name: `Hello ${mockUser.name}`
			})
		).toBeVisible();
	});
});

test.describe('logged out', () => {
	// Reset storage state for this file to avoid being authenticated
	test.use({ storageState: { cookies: [], origins: [] } });

	test('redirects to login page if user is not logged in', async ({ page }) => {
		await page.goto('/');

		await expect(page).toHaveURL('/login');

		await expect(
			page.getByRole('heading', {
				name: 'Login/Register'
			})
		).toBeVisible();
	});
});
