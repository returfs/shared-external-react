import React, { forwardRef, Ref } from 'react';
import { IconButtonProps } from './types';
import { twMerge } from 'tailwind-merge';
import {
  hoverNeutralOneHundredSevenHundredBgColors,
  neutralOneHundredSeventHundredBgColors,
} from 'src/styles';
import { IconButton as ChakraIconButton } from '@chakra-ui/react';

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref: Ref<HTMLButtonElement>) => {
    const { children, ...restOfProps } = props;

    return (
      <ChakraIconButton
        aria-label={props[`aria-label`] || 'Icon Button'}
        size={'sm'}
        variant={'ghost'}
        {...restOfProps}
        onClick={restOfProps?.onClick}
        fontWeight={'normal'}
        rounded={'none'}
        ref={ref}
        className={twMerge(
          '!transition-colors !duration-200 !transform !text-inherit !rounded-lg',
          hoverNeutralOneHundredSevenHundredBgColors,
          props.isActive && neutralOneHundredSeventHundredBgColors,
          props?.className,
        )}
      >
        {children}
      </ChakraIconButton>
    );
  },
);

export default IconButton;
