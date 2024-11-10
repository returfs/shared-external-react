import React, { forwardRef, Ref } from 'react';
import { twMerge } from 'tailwind-merge';
import { EntranceProps } from './types';
import { nineFiftyTwoHundredTextColors } from 'src/styles/colors/Text';

const Entrance = forwardRef<HTMLDivElement, EntranceProps>(
  ({ themeColor, ...props }, ref: Ref<HTMLDivElement>) => {
    return (
      <div
        {...props}
        ref={ref}
        className={twMerge(
          'h-full bg-neutral-100 dark:bg-neutral-900',
          nineFiftyTwoHundredTextColors[themeColor],
          props.className,
        )}
      >
        {props.children}
      </div>
    );
  },
);

export default Entrance;
