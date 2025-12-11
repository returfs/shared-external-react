import type { Preview } from '@storybook/react-vite';
import { JSX } from 'react';
import { ColorKey, ThemeProvider } from '../src';
import '../src/assets/index.css';

const withTheme = (Story: () => JSX.Element, context: any): JSX.Element => (
  <div>
    <ThemeProvider colorKey={ColorKey.Gray}>
      <Story {...context} />
    </ThemeProvider>
  </div>
);

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
  },
};

export default preview;
