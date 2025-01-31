import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from 'src/lib';
import { useTheme } from 'src/state';
import {
  dataStateActiveTwoHundredEightHundredBgColors,
  dataStateNineFiftyFiftyTextColors,
  fiftyNineFiftyBgColors,
  fiveHundredFourHundredTextColors,
} from 'src/styles';
import { nineFiftyThreeHundredFocusVisibleRingColors } from 'src/styles/colors/Ring';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const { colorKey } = useTheme();

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'inline-flex h-full items-center justify-center rounded-lg p-1',
        fiftyNineFiftyBgColors[colorKey],
        fiveHundredFourHundredTextColors[colorKey],
        className,
      )}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const { colorKey } = useTheme();

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'inline-flex h-[30px] items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow dark:ring-offset-neutral-950',
        dataStateActiveTwoHundredEightHundredBgColors[colorKey],
        dataStateNineFiftyFiftyTextColors[colorKey],
        nineFiftyThreeHundredFocusVisibleRingColors[colorKey],
        className,
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300',
        className,
      )}
      {...props}
    />
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
