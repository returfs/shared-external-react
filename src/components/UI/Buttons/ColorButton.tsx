import React, { forwardRef } from 'react';
import { ColorButtonProps } from './types';
import { twMerge } from 'tailwind-merge';

const ColorButton = forwardRef<HTMLButtonElement, ColorButtonProps>(
  (props, ref) => {
    const { isActive, color, ...restOfProps } = props;

    return (
      <button
        {...restOfProps}
        ref={ref}
        title={color?.toString()}
        className={twMerge(
          'size-[22px] rounded-lg',
          isActive && 'ring-4 ring-neutral-400',
        )}
        style={{
          backgroundColor: color,
          color: color,
        }}
      ></button>
    );
  },
);

export default ColorButton;
