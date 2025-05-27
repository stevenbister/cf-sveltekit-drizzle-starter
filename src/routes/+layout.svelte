<script lang="ts">
	import { setUserContext } from '$lib/context/user';

	let { children, data } = $props();

	// Pass a function referencing our state
	// to the context for child components to access
	setUserContext(() => data.user);
</script>

{@render children()}
