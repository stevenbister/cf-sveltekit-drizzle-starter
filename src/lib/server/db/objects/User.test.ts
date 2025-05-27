import { drizzle } from 'drizzle-orm/d1';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { DbClient } from '../connection';
import type { User as UserType } from '../schema/user';
import { User } from './User';

vi.mock('drizzle-orm/d1', () => ({
	drizzle: vi.fn()
}));

const mockDbClient = vi.mocked(drizzle) as unknown as DbClient;

const mockUser: Partial<UserType> = {
	id: 'mock-user-id',
	email: 'mock-user-email@test.com'
};

const user = new User(mockDbClient);

describe('User', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('User.getByEmail', () => {
		it('returns user with matching email', async () => {
			mockDbClient.select = vi.fn().mockReturnValue({
				from: vi.fn().mockReturnValue({
					where: vi.fn().mockResolvedValue([mockUser])
				})
			});

			const [results] = await user.getByEmail(mockUser.email!);
			expect(results).toEqual(mockUser);
		});
	});
});
