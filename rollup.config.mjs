import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import { visualizer } from 'rollup-plugin-visualizer';

import packageJson from './package.json' assert { type: 'json' };

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
      },
      {
        sourcemap: true,
        format: 'esm',
        dir: 'dist/esm',
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
      postcss({
        extract: true,
        minimize: true,
      }),
      //   visualizer({
      //     filename: './bundle-analysis.html',
      //     open: true,
      //   }),
    ],
    external: [
      'react',
      'react-dom',
      'typescript',
      'tailwindcss',
      'tailwind-merge',
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
  {
    input: 'src/index.css',
    output: [{ file: 'dist/index.css', format: 'es' }],
    plugins: [
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },
];
