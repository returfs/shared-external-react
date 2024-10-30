import React, { forwardRef } from 'react';
import GenericDivider from './GenericDivider';
import { MenuDividerProps } from './types';
import { twMerge } from 'tailwind-merge';

const MenuDivider = forwardRef<HTMLDivElement, MenuDividerProps>(
  (props, ref) => {
    return (
      <>
        {props.orientation === 'vertical' ? (
          <div className="h-[25px]">
            <GenericDivider
              {...props}
              className={twMerge(
                'mx-1 !border-neutral-200 dark:!border-neutral-600',
                props.className,
              )}
              ref={ref}
            />
          </div>
        ) : (
          <GenericDivider
            {...props}
            className={twMerge(
              'my-1 !border-neutral-200 dark:!border-neutral-600',
              props.className,
            )}
            ref={ref}
          />
        )}
      </>
    );
  },
);

export default MenuDivider;
