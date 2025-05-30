<script lang="ts">
	import Button from '$/lib/components/button/button.svelte';
	import { authClient } from '$lib/auth/client';

	import * as Card from '../card';

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

<Card.Root>
	<Card.Header>
		<h1 class="login-title">Login</h1>
		<p class="login-description">Enter your email below to login to your account</p>
	</Card.Header>

	<Card.Content>
		<form method="post" onsubmit={handleSignIn} class="login-form">
			<div class="input-group">
				<label for="email">Email</label>
				<input id="email" name="email" bind:value={formData.email} />
			</div>

			<div class="input-group">
				<label for="password">Password</label>
				<input id="password" type="password" name="password" bind:value={formData.password} />
			</div>

			<Button class="mt-3">Login</Button>
		</form>
	</Card.Content>
</Card.Root>

<style lang="scss">
	.login-form {
		display: flex;
		flex-direction: column;
		gap: var(--size-3);
		margin-block-start: var(--size-3);
	}

	.login-title {
		font-size: var(--font-size-4);
		font-weight: var(--font-weight-6);
	}

	.login-description {
		color: var(--gray-7);
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: var(--size-1);

		label {
			font-weight: var(--font-weight-6);
		}

		input {
			background-color: transparent;
			padding: var(--size-px-2);
			border: var(--border-size-1) solid var(--surface-4-light);
			border-radius: var(--radius-2);
			color: var(--gray-7);
		}
	}
</style>
