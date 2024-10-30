import React, { forwardRef } from 'react';
import { IconTextButtonProps } from './types';
import { twMerge } from 'tailwind-merge';
import GenericButton from './GenericButton';
import { hoverNeutralOneHundredSevenHundredBgColors } from 'src/styles';
import { Icon } from '@chakra-ui/react';

const IconTextButton = forwardRef<HTMLButtonElement, IconTextButtonProps>(
  (props, ref) => {
    const { icon, text, ...restOfProps } = props;

    return (
      <GenericButton
        height={'30px'}
        {...restOfProps}
        className={twMerge(
          'w-full flex gap-3',
          hoverNeutralOneHundredSevenHundredBgColors,
          props?.className,
        )}
        ref={ref}
      >
        {icon && <Icon as={icon} h={5} w={5} alt={text} />}
        <span className="text-sm">{text}</span>
      </GenericButton>
    );
  },
);

export default IconTextButton;
