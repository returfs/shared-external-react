import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { twMerge } from 'tailwind-merge';
import { cn } from 'src/lib';
import { ColorKey } from '../../../styles/colors/Theme/types';
import {
  hoverOneHundredEightHundredBgColors,
  oneHundredEightHundredBgColors,
} from '../../../styles/colors/Background/Background';
import { ButtonProps } from './types';
import { useTheme } from 'src/state';
import {
  nineFiftyThreeHundredFocusVisibleRingColors,
  surfaceActiveBgColors,
  surfaceHoverBgColors,
  threeHundredSevenHundredBorderColors,
} from 'src/styles';

const buttonVariants = (colorKey: ColorKey, isActive: boolean) =>
  cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-300 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
      variants: {
        variant: {
          default: cn(
            'transform shadow-sm transition-colors duration-200 [&_svg]:size-5',
            hoverOneHundredEightHundredBgColors[colorKey],
            isActive && oneHundredEightHundredBgColors[colorKey],
          ),
          error:
            'border-red-300 bg-red-50 text-red-800 shadow-sm transition-colors duration-200 dark:border-red-700 dark:bg-red-900 dark:text-red-200 [&>svg]:text-red-800 dark:[&>svg]:text-red-200',
          success:
            'border-green-300 bg-green-50 text-green-800 shadow-sm transition-colors duration-200 dark:border-green-700 dark:bg-green-900 dark:text-green-200 [&>svg]:text-green-800 dark:[&>svg]:text-green-200',
          warning:
            'border-yellow-300 bg-yellow-50 text-yellow-800 shadow-sm transition-colors duration-200 dark:border-yellow-700 dark:bg-yellow-900 dark:text-yellow-200 [&>svg]:text-yellow-800 dark:[&>svg]:text-yellow-200',
          info: 'border-blue-300 bg-blue-50 text-blue-800 shadow-sm transition-colors duration-200 dark:border-blue-700 dark:bg-blue-900 dark:text-blue-200 [&>svg]:text-blue-800 dark:[&>svg]:text-blue-200',
          outline: cn(
            'border shadow-sm transition-colors duration-200',
            threeHundredSevenHundredBorderColors[colorKey],
            nineFiftyThreeHundredFocusVisibleRingColors[colorKey],
          ),
          ghost:
            'shadow-sm transition-colors duration-200 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
          link: 'text-neutral-900 underline-offset-4 shadow-sm transition-colors duration-200 hover:underline dark:text-neutral-50',
          menu: twMerge(
            'transform justify-start text-left shadow-sm transition-colors duration-200',
            surfaceHoverBgColors,
            isActive && surfaceActiveBgColors,
          ),
          tab: twMerge(
            'transform justify-start text-left shadow-sm transition-colors duration-200',
            hoverOneHundredEightHundredBgColors[colorKey],
            isActive && oneHundredEightHundredBgColors[colorKey],
          ),
        },
        size: {
          link: 'py-2',
          default: 'h-9 p-2',
          sm: 'h-8 rounded-lg px-2 text-xs',
          lg: 'h-10 rounded-lg px-8',
          icon: 'size-8 [&_svg]:size-4',
          menu: 'h-[30px] w-full rounded-none px-4 py-2',
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
    const { colorKey } = useTheme();
    const bv = buttonVariants(colorKey, isActive);

    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(bv({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
