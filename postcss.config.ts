import path from 'path';
import type { PostcssJitPropsOptions } from 'postcss-jit-props';
import postcssJitProps from 'postcss-jit-props';

export default {
	plugins: [
		postcssJitProps({
			files: [path.resolve(__dirname, 'node_modules/open-props/open-props.min.css')]
		} as PostcssJitPropsOptions)
	]
};
