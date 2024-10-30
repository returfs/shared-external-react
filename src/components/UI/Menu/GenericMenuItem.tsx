import React, { forwardRef } from 'react';
import { MenuItem, MenuItemProps } from '@chakra-ui/react';
import { twMerge } from 'tailwind-merge';
import { GenericMenuItemProps } from './types';
import {
  hoverNeutralOneHundredSevenHundredBgColors,
  neutralOneHundredSeventHundredBgColors,
} from 'src/styles';

const GenericMenuItem = forwardRef<MenuItemProps, GenericMenuItemProps>(
  (props, ref) => {
    return (
      <MenuItem
        {...props}
        ref={ref}
        height={'35px'}
        className={twMerge(
          '!transition-colors !duration-200 !transform !text-inherit !rounded-lg !bg-transparent',
          hoverNeutralOneHundredSevenHundredBgColors,
          props.isActive && neutralOneHundredSeventHundredBgColors,
          props.className,
        )}
        onClick={props.onClick}
      >
        {props.children}
      </MenuItem>
    );
  },
);

export default GenericMenuItem;
