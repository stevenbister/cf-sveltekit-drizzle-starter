<script lang="ts">
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
	{#if user()}
		<div>
			<h1>
				Hello {user().name}
			</h1>
			<button onclick={handleSignOut}> Sign Out </button>
		</div>
	{:else}
		<a href="/login">Sign in</a>
	{/if}
</div>
