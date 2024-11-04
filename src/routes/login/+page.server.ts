import { Database } from '$lib/server/db/connection';
import { Session } from '$lib/server/db/objects/Session';
import { User } from '$lib/server/db/objects/User';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	login: async (event) => {
		const db = Database.getInstance();
		const user = new User(db);
		const session = new Session(db);

		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (!user.validateEmail(email)) return fail(400, { message: 'Invalid email' });

		if (!user.validatePassword(password))
			return fail(400, {
				message: 'Invalid password, make sure password is more than 6 characters'
			});

		const results = await user.getByEmail(email);

		const existingUser = results.at(0);
		if (!existingUser) return fail(400, { message: 'Incorrect email or password' });

		const isCorrectPassword = user.verifyPassword(existingUser.password, password);
		if (!isCorrectPassword) return fail(400, { message: 'Incorrect email or password' });

		const sessionToken = session.generateToken();
		const newSession = await session.create(sessionToken, existingUser.id);
		session.setSessionTokenCookie(event, sessionToken, newSession.expiresAt);

		return redirect(302, '/');
	},
	register: async (event) => {
		const db = Database.getInstance();
		const user = new User(db);
		const session = new Session(db);

		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (!user.validateEmail(email)) return fail(400, { message: 'Invalid email' });

		if (!user.validatePassword(password))
			return fail(400, {
				message: 'Invalid password, make sure password is more than 6 characters'
			});

		const results = await user.getByEmail(email);

		const existingUser = results.at(0);
		if (existingUser) return fail(400, { message: 'User already exists' });

		try {
			const newUser = await user.createUser(email, password);

			const sessionToken = session.generateToken();
			const newSession = await session.create(sessionToken, newUser.id);
			session.setSessionTokenCookie(event, sessionToken, newSession.expiresAt);
		} catch (error) {
			console.error('ERROR', error);

			return fail(500, { message: 'An error has occurred' });
		}

		return redirect(302, '/');
	}
};
