import * as React from 'react';
import { cn } from '../../../../lib';

export type SliderProps = Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'type'
>;

/**
 * Themed range slider — a thin, dependency-free wrapper over the native
 * `<input type="range">`. The native fill/thumb pick up the user's accent via
 * the CSS `accent-color` property (`accent-(--accent-600)`), and the track uses
 * the standard neutral surface — so it matches the rest of the Balanced UI
 * without any bespoke styling at the call site.
 */
const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="range"
      data-slot="slider"
      className={cn(
        'h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 accent-(--accent-600) transition-colors disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-700',
        className,
      )}
      {...props}
    />
  ),
);
Slider.displayName = 'Slider';

export { Slider };
