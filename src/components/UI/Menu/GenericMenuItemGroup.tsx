import React, { forwardRef, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

const GenericMenuItemGroup = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <b ref={ref} className={twMerge('mt-2 first:mt-0', props.className)}>
      {props.children}
    </b>
  );
});

export default GenericMenuItemGroup;
