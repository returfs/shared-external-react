import * as React from 'react';
import { GenericAlertProps } from './types';
import {
  CheckCircle,
  Info,
  Question,
  WarningCircle,
  X,
} from '@phosphor-icons/react';
import { Alert, AlertDescription, AlertTitle } from './Alert';
import { cn } from 'src/lib';

const GenericAlert = React.forwardRef<HTMLDivElement, GenericAlertProps>(
  (
    {
      className,
      variant,
      title,
      description,
      icon,
      alertType,
      handleClose,
      ..._
    },
    ref,
  ) => {
    const Icon =
      variant === 'info' && !icon
        ? Info
        : variant === 'warning' || (variant === 'error' && !icon)
          ? WarningCircle
          : variant === 'success' && !icon
            ? CheckCircle
            : icon
              ? icon
              : Question;
    return (
      <Alert
        ref={ref}
        variant={variant}
        className={cn(
          'mx-auto mt-3 w-[35%]',
          alertType === 'slide' && 'w-full',
        )}
      >
        <Icon className="size-5" />
        <AlertTitle className="ml-1">{title}</AlertTitle>
        <AlertDescription className="ml-1">{description}</AlertDescription>
        {handleClose && (
          <button
            onClick={handleClose}
            className="absolute right-4 top-4"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        )}
      </Alert>
    );
  },
);
GenericAlert.displayName = 'GenericAlert';

export { GenericAlert };
