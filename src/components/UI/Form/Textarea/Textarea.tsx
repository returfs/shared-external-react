import * as React from 'react';

import { cn } from '../../../../lib/utils';
import { neutralTwoHundredEightHundredBorderColors } from '../../../../styles/colors/Border';
import { neutralThreeHundredSixHundredFocusVisibleRingColors } from '../../../../styles/colors/Ring';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'> & { bottomPane?: React.ReactNode }
>(({ className, bottomPane, ...props }, ref) => {
  return (
    <div className="relative flex flex-col">
      <textarea
        className={cn(
          'shadow-xs focus-visible:outline-hidden flex min-h-[56px] w-full rounded-lg border bg-transparent px-3 py-2 text-base focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm placeholder:text-neutral-500 dark:placeholder:text-neutral-400',
          bottomPane && 'pb-8',
          neutralTwoHundredEightHundredBorderColors,
          neutralThreeHundredSixHundredFocusVisibleRingColors,
          className,
        )}
        ref={ref}
        {...props}
      />

      {bottomPane && (
        <div className="absolute bottom-2 right-2 flex h-8 items-center gap-2">
          {bottomPane}
        </div>
      )}
    </div>
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
