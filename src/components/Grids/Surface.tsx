import React, { forwardRef } from 'react';
import { SurfaceProps } from './types';
import { twMerge } from 'tailwind-merge';
import { neutralFiftyEightHundredBgColors } from 'src/styles';
import { cva } from 'class-variance-authority';
import { cn } from 'src/lib';
import { neutralTwoHundredSevenHundredBorderColors } from 'src/styles/colors/Border';

export const surfaceVariants = cva(
  twMerge(
    'rounded-lg border shadow-sm',
    neutralFiftyEightHundredBgColors,
    neutralTwoHundredSevenHundredBorderColors,
  ),
  {
    variants: {
      variant: {
        default: '',
      },
      area: {
        default: '',
        contextMenu: ``,
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  ({ className, variant, area, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(surfaceVariants({ variant, area, className }))}
        {...props}
      >
        {props.children}
      </div>
    );
  },
);

export default Surface;
