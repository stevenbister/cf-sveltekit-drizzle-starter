import { Tasks } from '$lib/server/queries/Tasks';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const t = new Tasks();
  const tasks = await t.getAll();

  return { tasks };
}
