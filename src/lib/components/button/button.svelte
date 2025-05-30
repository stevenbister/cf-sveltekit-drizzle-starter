<script lang="ts">
	// https://www.bits-ui.com/docs/components/button
	import type { ButtonRootProps } from 'bits-ui';
	import { Button } from 'bits-ui';

	let { children, ...rest }: ButtonRootProps = $props();
</script>

<Button.Root {...rest} class={['btn', rest.class]}>{@render children?.()}</Button.Root>

<style lang="scss">
	:global(.btn) {
		color: var(--surface-1-light);
		background-color: var(--gray-12);
		padding: var(--size-px-2) var(--size-px-3);
		border-color: transparent;
		border-radius: var(--radius-2);
		cursor: pointer;

		&:hover {
			background-color: var(--gray-7);
		}

		&:active {
			background-color: var(--gray-8);
		}
	}

	:global(.btn[disabled]) {
		background-color: var(--gray-6);
		cursor: not-allowed;
	}
</style>
