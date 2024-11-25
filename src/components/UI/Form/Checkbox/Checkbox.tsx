import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from 'src/lib';
import { Check } from '@phosphor-icons/react';
import { useTheme } from 'src/state';
import {
  dataStateCheckedFiftyNineHundredTextColors,
  dataStateCheckedNineHundredFiftyBgColors,
  threeHundredSevenHundredBorderColors,
} from 'src/styles';
import { nineFiftyThreeHundredFocusVisibleRingColors } from 'src/styles/colors/Ring';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { colorKey } = useTheme();

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-md border shadow focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
        threeHundredSevenHundredBorderColors[colorKey],
        nineFiftyThreeHundredFocusVisibleRingColors[colorKey],
        dataStateCheckedNineHundredFiftyBgColors[colorKey],
        dataStateCheckedFiftyNineHundredTextColors[colorKey],
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn('flex items-center justify-center text-current')}
      >
        <Check weight="bold" className="h-3 w-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
