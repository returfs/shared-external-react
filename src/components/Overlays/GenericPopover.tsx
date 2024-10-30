import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
} from '@chakra-ui/react';
import { twMerge } from 'tailwind-merge';
import { GenericPopoverProps } from './types';
import {
  neutralFiftyEightHundredBgColors,
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
        className={twMerge(
          neutralFiftyEightHundredBgColors,
          neutralTwoHundredSevenHundredBorderColors,
          'border shadow-sm rounded-lg',
          contentProps?.className,
        )}
      >
        <PopoverCloseButton {...closeBtnProps} />
        <PopoverHeader
          height={'35px'}
          {...headerProps}
          className={`${twMerge(`bg-transparent rounded-t-md`, headerProps?.className)}`}
        >
          {headerContent}
        </PopoverHeader>
        <PopoverBody
          {...bodyProps}
          className={`${twMerge(`bg-transparent`, bodyProps?.className)}`}
        >
          {bodyContent}
        </PopoverBody>
        <PopoverFooter
          {...footerProps}
          className={`${(twMerge(`bg-transparent rounded-b-lg`), footerProps?.className)}`}
        >
          {footerContent}
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
