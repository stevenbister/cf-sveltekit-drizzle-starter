<script lang="ts">
	let { children } = $props();
</script>

<header class="card-header">
	{@render children()}
</header>

<style>
	.card-header {
		display: flex;
		flex-direction: column;
		gap: var(--size-2);
	}
</style>
