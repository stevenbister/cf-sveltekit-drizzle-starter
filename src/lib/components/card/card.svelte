<script lang="ts">
	let { children } = $props();
</script>

<article class="card mx-auto">
	{@render children()}
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: var(--size-3);
		padding: var(--size-px-6) var(--size-px-4);
		border: var(--border-size-1) solid var(--surface-4-light);
		border-radius: var(--radius-3);
		background-color: var(--surface-1-light);
		max-width: 24rem;
	}
</style>
