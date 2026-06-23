import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as React from 'react';
import { cn } from '../../../../lib';
import { useTheme } from '../../../../state';
import {
  dataStateCheckedNineHundredFiftyBgColors,
  threeHundredSevenHundredBorderColors,
} from '../../../../styles';
import { nineFiftyThreeHundredFocusVisibleRingColors } from '../../../../styles/colors/Ring';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { colorKey } = useTheme();

  return (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch"
      className={cn(
        'shadow-xs data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80 peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border outline-none transition-all focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        threeHundredSevenHundredBorderColors[colorKey],
        nineFiftyThreeHundredFocusVisibleRingColors[colorKey],
        dataStateCheckedNineHundredFiftyBgColors[colorKey],
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0',
        )}
      />
    </SwitchPrimitive.Root>
  );
});
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
