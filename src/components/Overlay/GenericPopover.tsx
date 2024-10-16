import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import { twMerge } from 'tailwind-merge';
import { GenericPopoverProps } from './types';
import {
  neutralNineHundredBgColors,
  neutralTwoHundredSevenHundredBorderColors,
} from '../../styles/colors';

export default function GenericPopover({
  trigger,
  props,
  contentProps,
  arrowProps,
  closeBtnProps,
  headerProps,
  headerContent,
  bodyProps,
  bodyContent,
  footerProps,
  footerContent,
}: GenericPopoverProps) {
  return (
    <Popover {...props}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent
        width={'100%'}
        {...contentProps}
        className={`${twMerge(`${neutralNineHundredBgColors} ${neutralTwoHundredSevenHundredBorderColors} shadow-sm`, contentProps?.className)}`}
      >
        <PopoverArrow shadow={'none'} {...arrowProps} />
        <PopoverCloseButton {...closeBtnProps} />
        <PopoverHeader
          height={'35px'}
          {...headerProps}
          className={`${twMerge(`rounded-t-lg`, headerProps?.className)}`}
        >
          {headerContent}
        </PopoverHeader>
        <PopoverBody
          {...bodyProps}
          className={`${twMerge(`bg-white dark:bg-neutral-900 rounded-lg`, bodyProps?.className)}`}
        >
          {bodyContent}
        </PopoverBody>
        <PopoverFooter
          {...footerProps}
          className={`${(twMerge(`bg-white dark:bg-neutral-900 rounded-b-lg`), footerProps?.className)}`}
        >
          {footerContent}
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
