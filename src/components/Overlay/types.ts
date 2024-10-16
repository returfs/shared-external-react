import {
  PopoverArrowProps,
  PopoverBodyProps,
  PopoverCloseButtonProps,
  PopoverContentProps,
  PopoverFooterProps,
  PopoverHeaderProps,
  PopoverProps,
} from '@chakra-ui/react';

export interface GenericPopoverProps {
  trigger: JSX.Element;
  props?: Omit<PopoverProps, 'children'>;
  contentProps?: PopoverContentProps;
  arrowProps?: PopoverArrowProps;
  closeBtnProps?: PopoverCloseButtonProps;
  headerProps?: PopoverHeaderProps;
  bodyProps?: PopoverBodyProps;
  footerProps?: PopoverFooterProps;
  headerContent?: JSX.Element | string;
  bodyContent?: JSX.Element | string;
  footerContent?: JSX.Element | string;
}
