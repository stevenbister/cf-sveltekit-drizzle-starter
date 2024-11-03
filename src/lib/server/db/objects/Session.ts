import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { DbClient } from '../connection';
import type { Session as SessionTable } from '../schema/session';
import { session as sessionTable } from '../schema/session';
import type { User as UserTable } from '../schema/user';
import { user as userTable } from '../schema/user';
import { TableCommon } from './TableCommon';

const DAY_IN_MS = 1000 * 60 * 60 * 24;
export const SESSION_COOKIE_NAME = 'session';

export type SessionValidationResult =
	| { session: SessionTable; user: Omit<UserTable, 'password'> }
	| { session: null; user: null };

export class Session extends TableCommon<typeof sessionTable> {
	constructor(db: DbClient) {
		super(db, sessionTable);
	}

	generateToken() {
		const bytes = new Uint8Array(20);
		crypto.getRandomValues(bytes);

		const token = encodeBase32LowerCaseNoPadding(bytes);
		return token;
	}

	async create(token: string, userId: number) {
		const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
		const expiresAt = new Date(Date.now() + DAY_IN_MS * 30);

		const [session] = await this.db
			.insert(this.schema)
			.values({
				id: sessionId,
				userId,
				expiresAt
			})
			.returning();

		return session;
	}

	async validate(token: string) {
		const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

		const results = await this.db
			.select({
				user: {
					id: userTable.id,
					email: userTable.email
				},
				session: this.schema
			})
			.from(this.schema)
			.innerJoin(userTable, eq(this.schema.userId, userTable.id))
			.where(eq(this.schema.id, sessionId));

		if (results.length < 1) {
			return { session: null, user: null };
		}

		const { session, user } = results[0];

		if (Date.now() >= session.expiresAt.getTime()) {
			await this.db.delete(this.schema).where(eq(this.schema.id, session.id));

			return { session: null, user: null };
		}

		// If the session is due to expire then extends the session to the next 30 days
		if (Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15) {
			session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);

			await this.db
				.update(sessionTable)
				.set({
					expiresAt: session.expiresAt
				})
				.where(eq(sessionTable.id, session.id));
		}

		return { session, user };
	}

	async invalidate(sessionId: string) {
		await this.db.delete(sessionTable).where(eq(this.schema.id, sessionId));
	}

	setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
		event.cookies.set(SESSION_COOKIE_NAME, token, {
			expires: expiresAt,
			path: '/'
		});
	}

	deleteSessionTokenCookie(event: RequestEvent) {
		event.cookies.delete(SESSION_COOKIE_NAME, {
			path: '/'
		});
	}
}
