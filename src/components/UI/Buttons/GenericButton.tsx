import React, { forwardRef } from 'react';
import { Button } from '@chakra-ui/react';
import { GenericButtonProps } from './types';
import { twMerge } from 'tailwind-merge';
import {
  hoverNeutralOneHundredSevenHundredBgColors,
  neutralFiftyEightHundredBgColors,
  neutralOneHundredSeventHundredBgColors,
} from 'src/styles';

const GenericButton = forwardRef<HTMLButtonElement, GenericButtonProps>(
  (props, ref) => {
    return (
      <Button
        variant={'ghost'}
        {...props}
        onClick={props?.onClick}
        fontWeight={'normal'}
        justifyContent={'flex-start'}
        rounded={'none'}
        className={twMerge(
          '!transition-colors !duration-200 !transform !text-inherit',
          neutralFiftyEightHundredBgColors,
          hoverNeutralOneHundredSevenHundredBgColors,
          props.isActive && neutralOneHundredSeventHundredBgColors,
          props?.className,
        )}
        ref={ref}
      >
        {props.children}
      </Button>
    );
  },
);

export default GenericButton;
