import { Root } from '@radix-ui/react-label';
import { ComponentPropsWithoutRef, HTMLAttributes } from 'react';
import { ComponentHasError } from '../../types';

export interface FormMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  message?: string;
}

export interface FormLabelProps
  extends ComponentPropsWithoutRef<typeof Root>,
    ComponentHasError {}
