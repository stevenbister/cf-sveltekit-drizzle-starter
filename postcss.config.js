import path from 'path';
import postcssJitProps from 'postcss-jit-props';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	plugins: [
		postcssJitProps({
			files: [path.resolve(__dirname, 'node_modules/open-props/open-props.min.css')]
		})
	]
};
