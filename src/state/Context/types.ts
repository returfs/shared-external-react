import { ReactNode } from 'react';
import { ColorKey } from 'src/styles';

export interface ThemeContextProps {
  colorKey: ColorKey;
}

export interface ThemeProviderProps extends ThemeContextProps {
  children: ReactNode;
}
