<script lang="ts">
	import { authClient } from '$lib/auth/client';
	import { getUserContext } from '$lib/context/user';

	const user = getUserContext();

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

<h1>Login/Register</h1>
<form method="post" onsubmit={handleSignIn}>
	<label>
		Email
		<input name="email" bind:value={formData.email} />
	</label>
	<label>
		Password
		<input type="password" name="password" bind:value={formData.password} />
	</label>
	<button>Login</button>
	{user()?.name}
</form>
