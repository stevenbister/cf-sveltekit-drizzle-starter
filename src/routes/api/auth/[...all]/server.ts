import type { RequestHandler } from '@sveltejs/kit';
import { toSvelteKitHandler } from 'better-auth/svelte-kit';

// Better Auth needs to be able to handle the callback, so we need to create a server endpoint here.

export const GET: RequestHandler = async ({ locals }) =>
	toSvelteKitHandler(locals.auth) as unknown as Response;

export const POST: RequestHandler = async ({ locals }) =>
	toSvelteKitHandler(locals.auth) as unknown as Response;
