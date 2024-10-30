import {
  MenuButtonProps,
  MenuItemProps,
  MenuListProps,
  MenuProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface GenericMenuProps {
  props?: Omit<MenuProps, 'children'>;
  menuButtonProps?: MenuButtonProps & {
    isActive?: boolean;
    hasRightIcon?: boolean;
  };
  menuButtonContent?: ReactNode;
  menuListProps?: Omit<MenuListProps, 'children'>;
  menuListContent?: ReactNode;
}

export interface GenericMenuItemProps extends MenuItemProps {
  isActive?: boolean;
}

export interface GenericMenuItemGroupProps {}
