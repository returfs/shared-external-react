import React, { forwardRef } from 'react';
import { SurfaceProps } from './types';
import { twMerge } from 'tailwind-merge';
import {
  neutralFiftyEightHundredBgColors,
  neutralTwoHundredSevenHundredBorderColors,
} from 'src/styles';

const Surface = forwardRef<HTMLDivElement, SurfaceProps>((props, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        'shadow-sm rounded-lg border',
        neutralFiftyEightHundredBgColors,
        neutralTwoHundredSevenHundredBorderColors,
        props?.className,
      )}
    >
      {props.children}
    </div>
  );
});

export default Surface;
