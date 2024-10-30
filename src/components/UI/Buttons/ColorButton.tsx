import React, { forwardRef } from 'react';
import { ColorButtonProps } from './types';
import { Button } from '@chakra-ui/react';
import { twMerge } from 'tailwind-merge';

const ColorButton = forwardRef<HTMLButtonElement, ColorButtonProps>(
  (props, ref) => {
    const { isActive, color, ...restOfProps } = props;

    return (
      <Button
        {...restOfProps}
        ref={ref}
        title={color?.toString()}
        background={color}
        color={color}
        height="22px"
        width="22px"
        padding={0}
        minWidth="unset"
        _hover={{ background: color }}
        className={twMerge(
          isActive && 'ring-4 ring-neutral-400',
          props?.className,
        )}
      ></Button>
    );
  },
);

export default ColorButton;
