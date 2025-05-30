<script lang="ts">
	import Button from '$/lib/components/button/button.svelte';
	import { invalidateAll } from '$app/navigation';
	import { authClient } from '$lib/auth/client';
	import { getUserContext } from '$lib/context/user';

	const user = getUserContext();

	const handleSignOut = async () =>
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => invalidateAll()
			}
		});
</script>

<div>
	<h2 class="ta-center">
		Hello {user().name}
	</h2>
	<Button onclick={handleSignOut} class="mx-auto">Sign Out</Button>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: var(--size-4);
	}
</style>
