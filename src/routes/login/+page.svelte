<script lang="ts">
	import { authClient } from '$lib/auth/client';
	import { writable } from 'svelte/store';

	const email = writable('');
	const password = writable('');

	const handleSignIn = async () => {
		await authClient.signIn.email(
			{
				email: $email,
				password: $password,
				callbackURL: '/'
			},
			{
				onError(context) {
					alert(context.error.message);
				}
			}
		);
	};
</script>

<h1>Login/Register</h1>
<form method="post" on:submit|preventDefault={handleSignIn}>
	<label>
		Email
		<input name="email" bind:value={$email} />
	</label>
	<label>
		Password
		<input type="password" name="password" bind:value={$password} />
	</label>
	<button>Login</button>
</form>
