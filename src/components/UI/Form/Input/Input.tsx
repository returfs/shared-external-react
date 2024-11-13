import React, { forwardRef } from 'react';
import { InputProps } from './types';
import { cn } from 'src/lib';
import { threeHundredSevenHundredBorderColors } from 'src/styles/colors/Border';
import {
  fiveHundredFourHundredPlaceholderTextColors,
  nineFiftyFiftyFileTextColors,
  nineFiftyTwoHundredTextColors,
} from 'src/styles';
import { nineFiftyThreeHundredFocusVisibleRingColors } from 'src/styles/colors/Ring';
import { useTheme } from 'src/state';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    const { colorKey } = useTheme();

    const InputIcon = icon;

    return (
      <>
        {InputIcon && (
          <span className="absolute inset-y-0 left-0 z-10 flex items-center pl-2">
            <button
              type="submit"
              className={cn(
                'focus:shadow-outline focus:outline-none dark:bg-transparent',
                threeHundredSevenHundredBorderColors[colorKey],
                nineFiftyTwoHundredTextColors[colorKey],
                nineFiftyFiftyFileTextColors[colorKey],
                fiveHundredFourHundredPlaceholderTextColors[colorKey],
                nineFiftyThreeHundredFocusVisibleRingColors[colorKey],
              )}
            >
              <InputIcon className="size-6 flex-shrink-0" />
            </button>
          </span>
        )}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-lg border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            threeHundredSevenHundredBorderColors[colorKey],
            nineFiftyTwoHundredTextColors[colorKey],
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
