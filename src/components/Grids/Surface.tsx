import { cva } from 'class-variance-authority';
import React, { ElementType, forwardRef } from 'react';
import { cn } from '../../lib';
import {
  surfaceBgAndBorderColors,
  surfaceDivideColors,
} from '../../styles/colors/Group';
import type { SurfaceProps, PolymorphicRef } from './types';

export const surfaceVariants = cva(
  cn(
    'shadow-xs rounded-lg border',
    surfaceBgAndBorderColors,
    surfaceDivideColors,
  ),
  {
    variants: {
      variant: {
        default: '',
      },
      area: {
        default: '',
        contextMenu: ``,
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

/* polymorphic component */
function SurfaceImpl<T extends ElementType = 'div'>(
  { as, className, variant, area, ...props }: SurfaceProps<T>,
  ref?: PolymorphicRef<T>,
) {
  const Component: ElementType = as || 'div';

  return (
    // cast props/ref to any to satisfy JSX typing for the polymorphic element
    // (safe because SurfaceProps omits conflicting props like className)
    <Component
      ref={ref as any}
      className={cn(surfaceVariants({ variant, area, className }))}
      {...(props as any)}
    >
      {props.children}
    </Component>
  );
}

import type { ForwardRefRenderFunction } from 'react';

const Surface = forwardRef(
  SurfaceImpl as ForwardRefRenderFunction<any, SurfaceProps<any>>,
) as <T extends ElementType = 'div'>(
  props: SurfaceProps<T> & { ref?: PolymorphicRef<T> },
) => React.ReactElement | null;

export default Surface;
