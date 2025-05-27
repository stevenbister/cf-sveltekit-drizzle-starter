import { Session } from '$lib/server/db/objects/Session';
import { User } from '$lib/server/db/objects/User';
import { pageNotFound } from '$lib/utils/pageNotFound';

import { mockUser } from '../../../../mocks/user';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ platform, locals }) => {
	if (platform?.env.ENVIRONMENT === 'production') pageNotFound();
	const { db, auth } = locals;

	const session = new Session(db);
	const user = new User(db);

	console.log('Seeding data 🌱');

	console.log('Resetting tables...');

	await session.deleteAll();
	await user.deleteAll();

	console.log('Tables reset');

	console.log('Creating test users...');

	await auth.api.signUpEmail({
		body: mockUser
	});

	console.log('Test users created');

	console.log('Seeding finished 🌳');

	return new Response('OK', { status: 200 });
};
