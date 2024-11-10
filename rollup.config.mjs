import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import { visualizer } from 'rollup-plugin-visualizer';
import treeShakeable from 'rollup-plugin-tree-shakeable';

import packageJson from './package.json' assert { type: 'json' };

export default [
  {
    input: 'src/index.ts',
    output: [
      //   {
      //     file: packageJson.main,
      //     format: 'cjs',
      //   },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        // format: 'es',
        // dir: 'dist/esm',
        // preserveModules: true,
        // preserveModulesRoot: 'src',
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
      //   postcss({
      //     extract: true,
      //   }),
      //   visualizer({
      //     filename: './bundle-analysis.html',
      //     open: true,
      //   }),
      treeShakeable(),
    ],
    external: [
      'react',
      'react-dom',
      '@chakra-ui/react',
      '@emotion/react',
      '@emotion/styled',
      'typescript',
      'tailwindcss',
      'tailwind-merge',
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
