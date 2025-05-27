import { getContext, setContext } from 'svelte';

import type { User } from '../../app';

const key = 'user';

export function setUserContext(user: () => User | undefined) {
	setContext(key, user);
}

export function getUserContext() {
	return getContext(key) as () => User;
}
