import { ReactNode } from 'react';
import { ColorKey } from '../../styles/colors/Theme/types';

export interface ThemeContextProps {
  colorKey: ColorKey;
}

export interface ThemeProviderProps extends ThemeContextProps {
  children: ReactNode;
}
