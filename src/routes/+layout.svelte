<script lang="ts">
	import { setUserContext } from '$lib/context/user';

	import '$styles/main.scss';

	let { children, data } = $props();

	// Pass a function referencing our state
	// to the context for child components to access
	setUserContext(() => data.user);
</script>

{@render children()}

<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
