<script lang="ts">
	let { children } = $props();
</script>

<div class="card-content">
	{@render children()}
</div>

<style>
	.card-content {
		display: flex;
		flex-direction: column;
		gap: var(--size-3);
	}
</style>
