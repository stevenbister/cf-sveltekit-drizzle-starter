<script lang="ts">
	// https://www.bits-ui.com/docs/components/button
	import type { ButtonRootProps } from 'bits-ui';
	import { Button } from 'bits-ui';

	let { children, ...rest }: ButtonRootProps = $props();
</script>

<Button.Root {...rest}>{@render children?.()}</Button.Root>
