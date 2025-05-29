<script lang="ts">
	import Button from '$/lib/components/button/button.svelte';
	import { authClient } from '$lib/auth/client';

	const formData = $state({
		email: '',
		password: ''
	});

	const handleSignIn = async (e: SubmitEvent) => {
		e.preventDefault();

		await authClient.signIn.email(
			{
				email: formData.email,
				password: formData.password,
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

<h1>Login</h1>
<form method="post" onsubmit={handleSignIn}>
	<label>
		Email
		<input name="email" bind:value={formData.email} />
	</label>
	<label>
		Password
		<input type="password" name="password" bind:value={formData.password} />
	</label>

	<Button>Login</Button>
</form>
