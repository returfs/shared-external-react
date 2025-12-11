import { forwardRef } from 'react';
import { cn } from '../../../lib';
import { ColorButtonProps } from './types';

const ColorButton = forwardRef<HTMLButtonElement, ColorButtonProps>(
  (props, ref) => {
    const { isActive, color, ...restOfProps } = props;

    return (
      <button
        {...restOfProps}
        ref={ref}
        title={color?.toString()}
        className={cn(
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
