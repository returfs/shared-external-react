import { ReactNode } from 'react';
import { ColorKey } from 'src/logic/Data';

export interface ThemeContextProps {
  colorKey: ColorKey;
  /**
   * The resolved base accent hex when the user picked a custom colour from the
   * wheel (or a preset's hex). The accent ramp CSS variables are derived from
   * this by the host; components keep styling via the `colorKey`-indexed maps
   * which now resolve to `--accent-*`. Optional for backwards compatibility.
   */
  hex?: string;
}

export interface ThemeProviderProps extends ThemeContextProps {
  children: ReactNode;
}
