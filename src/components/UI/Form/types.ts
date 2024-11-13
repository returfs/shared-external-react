import { HTMLAttributes } from 'react';

export interface FormMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  message?: string;
}
