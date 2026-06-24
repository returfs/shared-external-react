import React, { forwardRef } from 'react';
import { InputProps } from './types';
import { cn } from '../../../../lib';
import { threeHundredSevenHundredBorderColors } from '../../../../styles/colors/Border';
import {
  fiveHundredFourHundredPlaceholderTextColors,
  nineFiftyFiftyFileTextColors,
} from '../../../../styles';
import { nineFiftyThreeHundredFocusVisibleRingColors } from '../../../../styles/colors/Ring';
import { useTheme } from '../../../../state';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    const { colorKey } = useTheme();

    const InputIcon = icon;

    return (
      <>
        {InputIcon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              className={cn(
                'focus:shadow-outline focus:outline-hidden dark:bg-transparent',
                threeHundredSevenHundredBorderColors[colorKey],
                nineFiftyFiftyFileTextColors[colorKey],
                fiveHundredFourHundredPlaceholderTextColors[colorKey],
                nineFiftyThreeHundredFocusVisibleRingColors[colorKey],
              )}
            >
              <InputIcon className="size-6 shrink-0" />
            </button>
          </span>
        )}
        <input
          type={type}
          className={cn(
            'shadow-xs focus-visible:outline-hidden flex h-9 w-full rounded-lg border bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            threeHundredSevenHundredBorderColors[colorKey],
            nineFiftyFiftyFileTextColors[colorKey],
            fiveHundredFourHundredPlaceholderTextColors[colorKey],
            nineFiftyThreeHundredFocusVisibleRingColors[colorKey],
            icon && 'pl-9',
            className,
          )}
          ref={ref}
          {...props}
        />
      </>
    );
  },
);
Input.displayName = 'Input';

export { Input };
