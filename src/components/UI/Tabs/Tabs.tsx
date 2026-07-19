import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';
import { cn } from '../../../lib';
import { useTheme } from '../../../state';
import { nineFiftyThreeHundredFocusVisibleRingColors } from '../../../styles/colors/Ring';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        // Neutral strip; the ACTIVE trigger carries the accent, matching the
        // app-wide Button isActive tint (solid accent fills read as danger).
        'inline-flex h-full items-center justify-center rounded-lg p-1',
        'bg-neutral-100 text-neutral-500 dark:bg-neutral-800/60 dark:text-neutral-400',
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
        'focus-visible:outline-hidden inline-flex h-[30px] items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-white transition-all focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm dark:ring-offset-neutral-950',
        // Same faint tint as Button's isActive (accentSelectedBgColor), in
        // data-state form.
        'data-[state=active]:bg-[color-mix(in_oklab,var(--accent-500)_12%,transparent)] dark:data-[state=active]:bg-[color-mix(in_oklab,var(--accent-500)_22%,transparent)]',
        'data-[state=active]:text-(--accent-600) dark:data-[state=active]:text-(--accent-400)',
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
        'focus-visible:outline-hidden mt-2 ring-offset-white focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300',
        className,
      )}
      {...props}
    />
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
