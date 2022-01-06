import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { readFileSync } from 'fs';
import { precompile } from 'handlebars';
import { dirname, resolve } from 'path';
import externals from 'rollup-plugin-node-externals';
import { terser } from 'rollup-plugin-terser';

/**
 * Custom plugin to parse handlebar imports and precompile
 * the template on the fly. This reduces runtime by about
 * half on large projects.
 */
const handlebarsPlugin = () => ({
    resolveId(file, importer) {
        if (file.endsWith('.hbs')) {
            return resolve(dirname(importer), file);
        }
        return null;
    },
    load(file) {
        if (file.endsWith('.hbs')) {
            const template = readFileSync(file, 'utf8').toString().trim();
            const templateSpec = precompile(template, {
                strict: true,
                noEscape: true,
                knownHelpersOnly: true,
                knownHelpers: {},
            });
            return `export default ${templateSpec};`;
        }
        return null;
    },
});

export default {
    input: './src/index.js',
    output: {
        file: './dist/index.js',
        format: 'cjs',
    },
    plugins: [
        externals({
            deps: true,
        }),
        nodeResolve(),
        commonjs({
            sourceMap: false,
        }),
        handlebarsPlugin(),
        terser({
            output: {
                comments: false,
            },
        }),
    ],
};
