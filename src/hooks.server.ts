import { type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { Database } from '$lib/server/db';

const setDB: Handle = async ({ event, resolve }) => {
	Database.initialize(event.platform?.env.DB);

	return await resolve(event);
};

export const handle = sequence(setDB);
