import { globSync } from 'glob';
import path, { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type ConfigEnv } from 'vite';
import dts from 'vite-plugin-dts';

import { peerDependencies } from './package.json';

export default (defineConfig as any)(async (_env: ConfigEnv) => {
  const { default: react } = await import('@vitejs/plugin-react');
  const { default: tailwindcss } = await import('@tailwindcss/vite');

  // keep external list in sync with rollup.config.mjs
  const rollupExternals = [
    'react',
    'react/jsx-runtime',
    'react-dom',
    'typescript',
    'tailwindcss',
  ];

  const externalSet = new Set<string>([
    ...Object.keys(peerDependencies || {}),
    ...rollupExternals,
  ]);
  const external = Array.from(externalSet);

  return {
    plugins: [
      react(),
      tailwindcss(),
      dts({
        include: ['src'],
        exclude: ['**/*.stories.{ts,tsx}', '**/*.test.ts'],
      }),
    ],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        formats: ['es'],
      },
      rollupOptions: {
        external,
        input: Object.fromEntries(
          globSync(['src/**/*.{ts,tsx}']).map(file => {
            const entryName = path.relative(
              'src',
              file.slice(0, file.length - path.extname(file).length),
            );
            const entryUrl = fileURLToPath(new URL(file, import.meta.url));
            return [entryName, entryUrl];
          }),
        ),
        output: {
          entryFileNames: '[name].js',
          //   assetFileNames: 'assets/[name][extname]',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'react/jsx-runtime',
          },
        },
      },
    },
  };
});
