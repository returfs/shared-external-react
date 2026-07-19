import React, { forwardRef } from 'react';
import { InputProps } from './types';
import { cn } from '../../../../lib';
import { neutralTwoHundredEightHundredBorderColors } from '../../../../styles/colors/Border';
import { nineFiftyFiftyFileTextColors } from '../../../../styles';
import { neutralThreeHundredSixHundredFocusVisibleRingColors as focusRing } from '../../../../styles/colors/Ring';
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
                neutralTwoHundredEightHundredBorderColors,
                nineFiftyFiftyFileTextColors[colorKey],
                'placeholder:text-neutral-500 dark:placeholder:text-neutral-400',
                focusRing,
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
            neutralTwoHundredEightHundredBorderColors,
            nineFiftyFiftyFileTextColors[colorKey],
            'placeholder:text-neutral-500 dark:placeholder:text-neutral-400',
            focusRing,
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
