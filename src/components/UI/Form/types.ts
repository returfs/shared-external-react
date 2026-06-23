import { Root } from '@radix-ui/react-label';
import { ComponentPropsWithoutRef, HTMLAttributes } from 'react';
import { ComponentHasError } from '../../types';

export type MessageVariants = 'info' | 'success' | 'warning';

export interface FormMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  message?: string;
  variant?: MessageVariants;
}

export interface FormLabelProps
  extends ComponentPropsWithoutRef<typeof Root>,
    ComponentHasError {}
