import { Check } from '@phosphor-icons/react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';
import { cn } from '../../../../lib';
import { neutralTwoHundredEightHundredBorderColors } from '../../../../styles/colors/Border';
import { neutralThreeHundredSixHundredFocusVisibleRingColors } from '../../../../styles/colors/Ring';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        // Balanced: neutral border + neutral focus ring; CHECKED = solid accent
        // (small high-intent control, like the Switch) with a white tick.
        'focus-visible:outline-hidden peer h-4 w-4 shrink-0 rounded-md border shadow-sm focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
        neutralTwoHundredEightHundredBorderColors,
        neutralThreeHundredSixHundredFocusVisibleRingColors,
        'data-[state=checked]:border-transparent data-[state=checked]:bg-(--accent-600) dark:data-[state=checked]:bg-(--accent-500) data-[state=checked]:text-white',
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
