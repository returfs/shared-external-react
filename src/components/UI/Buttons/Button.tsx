import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { twMerge } from 'tailwind-merge';
import { cn } from 'src/lib';
import {
  hoverNeutralOneHundredSevenHundredBgColors,
  neutralOneHundredSevenHundredBgColors,
} from 'src/styles';
import { ButtonProps } from './types';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-300 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: cn(
          'transform shadow-sm transition-colors duration-200',
          hoverNeutralOneHundredSevenHundredBgColors,
        ),
        error:
          'border-red-500 bg-red-50 text-red-800 shadow-sm transition-colors duration-200 dark:border-red-900 dark:bg-red-900 dark:text-red-200 [&>svg]:text-red-800 dark:[&>svg]:text-red-200',
        success:
          'border-green-500 bg-green-50 text-green-800 shadow-sm transition-colors duration-200 dark:border-green-900 dark:bg-green-900 dark:text-green-200 [&>svg]:text-green-800 dark:[&>svg]:text-green-200',
        warning:
          'border-yellow-500 bg-yellow-50 text-yellow-800 shadow-sm transition-colors duration-200 dark:border-yellow-900 dark:bg-yellow-900 dark:text-yellow-200 [&>svg]:text-yellow-800 dark:[&>svg]:text-yellow-200',
        info: 'border-blue-500 bg-blue-50 text-blue-800 shadow-sm transition-colors duration-200 dark:border-blue-900 dark:bg-blue-900 dark:text-blue-200 [&>svg]:text-blue-800 dark:[&>svg]:text-blue-200',
        outline:
          'border border-neutral-200 bg-white shadow-sm transition-colors duration-200 hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        ghost:
          'shadow-sm transition-colors duration-200 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        link: 'text-neutral-900 underline-offset-4 shadow-sm transition-colors duration-200 hover:underline dark:text-neutral-50',
        menu: twMerge(
          'transform justify-start px-4 py-2 text-left shadow-sm transition-colors duration-200',
          hoverNeutralOneHundredSevenHundredBgColors,
        ),
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-lg px-3 text-xs',
        lg: 'h-10 rounded-lg px-8',
        icon: 'size-8',
        menu: 'h-[30px] w-full rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, isActive = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          isActive && neutralOneHundredSevenHundredBgColors,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
