import { beforeEach, describe, expect, it, vi } from 'vitest';

import { mockUser } from '$mocks/user';

import type { DrizzleD1 } from '../seed';
import { testDB } from '../test/test-adapter';
import { UserQuery } from './User';

const user = new UserQuery(testDB as unknown as DrizzleD1);

describe('User', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('User.getByEmail', () => {
		it('returns user with matching email', async () => {
			const [results] = await user.getByEmail(mockUser.email!);

			expect(results).toEqual(
				expect.objectContaining({
					id: mockUser.id,
					email: mockUser.email,
					name: mockUser.name,
					emailVerified: mockUser.emailVerified,
					image: mockUser.image,
					createdAt: expect.any(Date),
					updatedAt: expect.any(Date)
				})
			);
		});
	});
});
