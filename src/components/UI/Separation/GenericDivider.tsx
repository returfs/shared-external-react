import React, { forwardRef } from 'react';
import { Divider } from '@chakra-ui/react';
import { GenericDividerProps } from './types';
import { twMerge } from 'tailwind-merge';

const GenericDivider = forwardRef<HTMLDivElement, GenericDividerProps>(
  (props, ref) => {
    return (
      <Divider {...props} className={twMerge(props.className)} ref={ref} />
    );
  },
);

export default GenericDivider;
