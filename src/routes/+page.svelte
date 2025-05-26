<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth/client';

	let { data } = $props();
	let { user } = $state(data);
</script>

<div>
	{#if user}
		<div>
			<h1>
				Hello {user.name}
			</h1>
			<button
				onclick={async () => {
					await authClient.signOut({
						fetchOptions: {
							onSuccess: () =>
								goto('/login', {
									replaceState: true
								})
						}
					});
				}}
			>
				Sign Out
			</button>
		</div>
	{:else}
		<a href="/login">Sign in</a>
	{/if}
</div>

<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
