import { ColorKey } from '../styles/colors/Theme/types';
import { Icon } from '@phosphor-icons/react';

export interface ComponentHasColorKey {
  colorKey: ColorKey;
}

export interface ComponentHasIcon {
  icon?: Icon;
}
