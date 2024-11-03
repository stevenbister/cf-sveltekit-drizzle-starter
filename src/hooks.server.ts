import { Database } from '$lib/server/db/connection';
import { Session, SESSION_COOKIE_NAME } from '$lib/server/db/objects/Session';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	Database.initialize(event.platform?.env.DB);

	const sessionToken = event.cookies.get(SESSION_COOKIE_NAME);

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;

		return await resolve(event);
	}

	const db = Database.getInstance();
	const auth = new Session(db);

	const { session, user } = await auth.validate(sessionToken);
	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;

	const response = await resolve(event);
	return response;
};
