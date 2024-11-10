import { Icon } from '@phosphor-icons/react';
import { HTMLAttributes, ReactNode } from 'react';

export type AlertVariants = 'info' | 'success' | 'warning' | 'error';

export type AlertTypes = 'nessage' | 'slide';

export interface GenericAlertProps extends HTMLAttributes<HTMLDivElement> {
  variant: AlertVariants;
  title: string;
  description: string | ReactNode;
  icon?: Icon;
  alertType?: AlertTypes;
  handleClose?: () => void;
}
