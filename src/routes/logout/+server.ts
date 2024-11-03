import { Database } from '$lib/server/db/connection';
import { Session } from '$lib/server/db/objects/Session';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	if (!event.locals.session) return redirect(302, '/login');

	const db = Database.getInstance();
	const session = new Session(db);

	await session.invalidate(event.locals.session.id);
	session.deleteSessionTokenCookie(event);

	return redirect(302, '/login');
};
