// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { getAuth } from '$lib/auth/server';
interface Env {
	DB: D1Database;
	ENVIRONMENT: 'development' | 'preview' | 'production';
}

export type Auth = ReturnType<typeof getAuth>;

declare global {
	namespace App {
		interface Platform {
			env: Env;
			cf: CfProperties;
			ctx: ExecutionContext;
		}

		interface Locals {
			db: import('$lib/server/db/connection').DbClient;
			auth: Auth;
			user?: {
				id: string;
				name: string;
				email: string;
			};
		}
	}
}

declare module 'cloudflare:test' {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface ProvidedEnv extends Env {}
}

export {};
