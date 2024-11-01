import { pageNotFound } from '$lib/utils/pageNotFound';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ platform }) => {
	if (platform?.env.ENVIRONMENT !== 'development') pageNotFound();

	return new Response();
};
