import { getAuth } from '$lib/auth/server';
import { Database } from '$lib/server/db/connection';
import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { svelteKitHandler } from 'better-auth/svelte-kit';

const setDB: Handle = async ({ event, resolve }) => {
	Database.initialize(event.platform?.env.DB);

	const db = Database.getInstance();
	event.locals.db = db;

	const auth = getAuth(db);
	event.locals.auth = auth;

	return await resolve(event);
};

const setSession: Handle = async ({ event, resolve }) =>
	svelteKitHandler({ auth: event.locals.auth, event, resolve });

const checkAuth: Handle = async ({ event, resolve }) => {
	const { auth } = event.locals;

	// if user is signed in, session should be here if the setSession hook hook has been run
	const headers = event.request.headers;
	const session = await auth.api.getSession({ headers });

	if (!session) {
		const publicPaths = ['/login', '/forgot-password', '/reset-password'];

		if (publicPaths.includes(event.url.pathname)) return await resolve(event);

		redirect(302, '/login');
	}

	event.locals.user = {
		id: session.user.id,
		name: session.user.name,
		email: session.user.email
	};

	return await resolve(event);
};

export const handle = sequence(setDB, setSession, checkAuth);
