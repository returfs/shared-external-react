import * as React from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { cn } from 'src/lib';
import {
  ColorKey,
  hoverOneHundredEightHundredBgColors,
  oneHundredEightHundredBgColors,
  twoHundredNineHundredBgColors,
} from 'src/styles';
import { SidebarButtonProps } from './types';
import { fiveHundredSixHundredRingColors } from 'src/styles/colors/Ring';
import { useTheme } from 'src/state';

const sidebarButtonVariants = (colorKey: ColorKey) =>
  cva(
    'inline-flex items-center justify-between whitespace-nowrap rounded-lg text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-300 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    {
      variants: {
        variant: {
          default: cn(
            'transform shadow-sm transition-colors duration-200',
            hoverOneHundredEightHundredBgColors[colorKey],
          ),
          parent: twoHundredNineHundredBgColors[colorKey],
        },
        size: {
          default:
            'h-[33px] w-full items-center justify-between px-2 py-[6.5px] lg:px-3',
          child:
            'h-[30px] w-full items-center justify-between py-[6.5px] pl-3 pr-2 lg:pl-4 lg:pr-3',
        },
      },
      defaultVariants: {
        variant: 'default',
        size: 'default',
      },
    },
  );

// todo: move to shared-internal-react
const SidebarButton = React.forwardRef<HTMLButtonElement, SidebarButtonProps>(
  (
    {
      className,
      variant,
      size,
      isActive = false,
      isRightClicked = false,
      ...props
    },
    ref,
  ) => {
    const { colorKey } = useTheme();
    const sbv = sidebarButtonVariants(colorKey);

    return (
      <button
        className={cn(
          sbv({ variant, size }),
          className,
          isActive && oneHundredEightHundredBgColors[colorKey],
          isRightClicked &&
            twMerge('ring-2', fiveHundredSixHundredRingColors[colorKey]),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
SidebarButton.displayName = 'SidebarButton';

export { SidebarButton, sidebarButtonVariants };
