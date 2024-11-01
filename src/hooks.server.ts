import { Database } from '$lib/server/db/connection';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	Database.initialize(event.platform?.env.DB);

	const response = await resolve(event);
	return response;
};
