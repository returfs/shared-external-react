import { ColorKey } from '../styles/colors/Theme/types';
import { Icon } from '@phosphor-icons/react';

export interface ComponentHasIsActive {
  isActive?: boolean;
}

export interface ComponentHasIsRightClicked {
  isRightClicked?: boolean;
}

export interface ComponentHasColorKey {
  colorKey: ColorKey;
}

export interface ComponentHasIcon {
  icon?: Icon;
}
