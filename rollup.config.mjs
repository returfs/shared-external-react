import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
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
      //   visualizer({
      //     filename: './bundle-analysis.html',
      //     open: true,
      //   }),
    ],
    external: [
      //   'react',
      //   'react-dom',
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
