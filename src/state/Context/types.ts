import { ReactNode } from 'react';
import { ColorKey } from 'src/logic/Data';

export interface ThemeContextProps {
  colorKey: ColorKey;
}

export interface ThemeProviderProps extends ThemeContextProps {
  children: ReactNode;
}
