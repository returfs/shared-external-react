import React from 'react';
import { Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { twMerge } from 'tailwind-merge';
import { GenericMenuProps } from './types';
import { GenericButton } from '../Buttons';
import { CaretDown } from '@phosphor-icons/react';
import {
  neutralFiftyEightHundredBgColors,
  neutralTwoHundredSevenHundredBorderColors,
} from 'src/styles';

export default function GenericMenu({
  props,
  menuButtonProps,
  menuButtonContent,
  menuListProps,
  menuListContent,
}: GenericMenuProps) {
  return (
    <Menu {...props}>
      <MenuButton
        {...menuButtonProps}
        as={GenericButton}
        {...(menuButtonProps?.hasRightIcon && { rightIcon: <CaretDown /> })}
        size={'sm'}
        className={'!rounded-lg'}
      >
        {menuButtonContent}
      </MenuButton>

      <MenuList
        className={twMerge(
          neutralFiftyEightHundredBgColors,
          neutralTwoHundredSevenHundredBorderColors,
          'border shadow-sm rounded-lg flex flex-col gap-1 px-4 !py-4',
          menuListProps?.className,
        )}
      >
        {menuListContent}
      </MenuList>
    </Menu>
  );
}
