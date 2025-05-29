import type { Account } from '$server/db/schema/account';
import type { User } from '$server/db/schema/user';

export const mockUser: User = {
	id: '1234',
	email: 'john@doe.com',
	name: 'John Doe',
	emailVerified: true,
	image: null,
	createdAt: new Date(),
	updatedAt: new Date()
};

export const mockAccount: Account = {
	id: '5678',
	accountId: 'account1234',
	providerId: 'provider1234',
	userId: mockUser.id,
	password: 'password',
	accessToken: null,
	refreshToken: null,
	idToken: null,
	accessTokenExpiresAt: null,
	refreshTokenExpiresAt: null,
	scope: null,
	createdAt: new Date(),
	updatedAt: new Date()
};
