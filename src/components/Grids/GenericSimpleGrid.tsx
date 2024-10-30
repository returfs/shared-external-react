import React, { forwardRef } from 'react';
import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react';
import { GenericSimpleGridProps } from './types';
import { twMerge } from 'tailwind-merge';
import {
  neutralFiftyEightHundredBgColors,
  neutralTwoHundredSevenHundredBorderColors,
} from 'src/styles';

const GenericSimpleGrid = forwardRef<SimpleGridProps, GenericSimpleGridProps>(
  (props, ref) => {
    return (
      <SimpleGrid
        {...props}
        ref={ref}
        className={twMerge(
          'rounded-lg border',
          neutralFiftyEightHundredBgColors,
          neutralTwoHundredSevenHundredBorderColors,
          props?.className,
        )}
      >
        {props.children}
      </SimpleGrid>
    );
  },
);

export default GenericSimpleGrid;
