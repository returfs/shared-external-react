import React, { forwardRef } from 'react';
import { SurfaceProps } from './types';
import { twMerge } from 'tailwind-merge';
import { cva } from 'class-variance-authority';
import { cn } from 'src/lib';
import { surfaceBgAndBorderColors } from 'src/styles/colors/Group';

export const surfaceVariants = cva(
  twMerge('rounded-lg border shadow-sm', surfaceBgAndBorderColors),
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
