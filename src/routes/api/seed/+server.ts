import { type DrizzleD1, clearTables } from '$lib/server/db/seed';
import { pageNotFound } from '$lib/utils/pageNotFound';
import { mockAccount, mockUser } from '$mocks/user';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ platform, locals }) => {
	if (platform?.env.ENVIRONMENT === 'production') pageNotFound();
	const { db, auth } = locals;

	console.log('Seeding data 🌱');

	console.log('Resetting tables...');

	await clearTables(db as DrizzleD1);

	console.log('Tables reset');

	console.log('Creating test users...');

	await auth.api.signUpEmail({
		body: {
			email: mockUser.email,
			password: mockAccount.password!,
			name: mockUser.name
		}
	});

	console.log('Test users created');

	console.log('Seeding finished 🌳');

	return new Response('OK', { status: 200 });
};
