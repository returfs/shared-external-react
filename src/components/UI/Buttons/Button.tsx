import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../../../lib';
import { ColorKey } from '../../../logic/Data';
import { useTheme } from '../../../state';
import {
  nineFiftyThreeHundredFocusVisibleRingColors,
  surfaceActiveBgColors,
  surfaceHoverBgColors,
  threeHundredSevenHundredBorderColors,
} from '../../../styles';
import {
  hoverTwoHundredEightHundredBgColors,
  twoHundredEightHundredBgColors,
} from '../../../styles/colors/Background/Background';
import { ButtonProps } from './types';

const buttonVariants = (colorKey: ColorKey, isActive: boolean) =>
  cva(
    'focus-visible:outline-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-300 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
      variants: {
        variant: {
          default: cn(
            'shadow-xs transform transition-colors duration-200 [&_svg]:size-5',
            hoverTwoHundredEightHundredBgColors[colorKey],
            isActive && twoHundredEightHundredBgColors[colorKey],
          ),
          error:
            'shadow-xs border border-red-200 bg-red-50 text-red-800 transition-colors duration-200 dark:border-red-700 dark:bg-red-900 dark:text-red-200 [&>svg]:text-red-800 dark:[&>svg]:text-red-200',
          success:
            'shadow-xs border border-green-200 bg-green-50 text-green-800 transition-colors duration-200 dark:border-green-700 dark:bg-green-900 dark:text-green-200 [&>svg]:text-green-800 dark:[&>svg]:text-green-200',
          warning:
            'shadow-xs border border-yellow-200 bg-yellow-50 text-yellow-800 transition-colors duration-200 dark:border-yellow-700 dark:bg-yellow-900 dark:text-yellow-200 [&>svg]:text-yellow-800 dark:[&>svg]:text-yellow-200',
          info: 'shadow-xs border border-blue-200 bg-blue-50 text-blue-800 transition-colors duration-200 dark:border-blue-700 dark:bg-blue-900 dark:text-blue-200 [&>svg]:text-blue-800 dark:[&>svg]:text-blue-200',
          outline: cn(
            'shadow-xs border transition-colors duration-200 hover:opacity-70',
            threeHundredSevenHundredBorderColors[colorKey],
            nineFiftyThreeHundredFocusVisibleRingColors[colorKey],
            isActive && twoHundredEightHundredBgColors[colorKey],
          ),
          ghost:
            'shadow-xs transition-colors duration-200 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
          link: 'shadow-xs text-neutral-900 underline-offset-4 transition-colors duration-200 hover:underline dark:text-neutral-50',
          menu: cn(
            'shadow-xs transform justify-start text-left transition-colors duration-200',
            surfaceHoverBgColors,
            isActive && surfaceActiveBgColors,
          ),
          tab: cn(
            'shadow-xs transform justify-start text-left transition-colors duration-200',
            hoverTwoHundredEightHundredBgColors[colorKey],
            isActive && twoHundredEightHundredBgColors[colorKey],
          ),
        },
        size: {
          link: 'py-2',
          default: 'h-9 p-2',
          sm: 'h-8 rounded-lg px-2 text-xs',
          lg: 'h-10 rounded-lg px-8',
          icon: 'size-8 shrink-0 [&_svg]:size-4',
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
