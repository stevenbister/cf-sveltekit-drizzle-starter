import { drizzle } from 'drizzle-orm/d1';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';

import { type DBType, Database } from './connection';
import * as schema from './schema';

vi.mock('drizzle-orm/d1', () => ({
	drizzle: vi.fn()
}));

const mockEnv: Partial<DBType> = {
	prepare: vi.fn(),
	dump: vi.fn(),
	batch: vi.fn(),
	exec: vi.fn()
};

const mockDBBindings = mockEnv as DBType;
const mockDbClient = vi.mocked(drizzle);

describe('Database.initialize', () => {
	beforeEach(() => {
		// Reset the instance before each test to avoid singleton pollution across tests
		Database['instance'] = null;
		Database['DB'] = undefined;
		vi.clearAllMocks();
	});

	it('should initialize with a valid DB instance', () => {
		(drizzle as Mock).mockReturnValue(mockDbClient);

		const dbClient = Database.initialize(mockDBBindings);

		expect(drizzle).toHaveBeenCalledWith(mockDBBindings, { schema });
		expect(dbClient).toBe(mockDbClient);
	});

	it('should return the same instance when initialized multiple times', () => {
		(drizzle as Mock).mockReturnValue(mockDbClient);

		const firstInstance = Database.initialize(mockDBBindings);
		const secondInstance = Database.initialize(mockDBBindings);

		expect(firstInstance).toBe(secondInstance);
		expect(drizzle).toHaveBeenCalledTimes(1);
	});

	it('should throw an error with an undefined DB instance', () => {
		expect(() => Database.initialize(undefined)).toThrowError();
	});

	it('should return the same instance with getInstance after initialization', () => {
		(drizzle as Mock).mockReturnValue(mockDbClient);

		Database.initialize(mockDBBindings);
		const dbClient = Database.getInstance();

		expect(dbClient).toBe(mockDbClient);
	});

	it('should throw an error if initialize is called without a DBType instance', () => {
		expect(() => Database.initialize(undefined)).toThrowError();
	});
});
