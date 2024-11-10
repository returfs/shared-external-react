import * as React from 'react';
import { WarningCircle, X } from '@phosphor-icons/react';
import { Alert, AlertDescription, AlertTitle } from '../Alert/Alert';

export interface GenericDialogProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'error';
  asChild?: boolean;
}

const GenericDialog = React.forwardRef<HTMLDivElement, GenericDialogProps>(
  ({ className, asChild = false, ...props }, ref) => {
    return (
      <Alert variant="error" className="mx-auto mt-3 w-[35%]">
        <WarningCircle className="size-5" />
        <AlertTitle className="ml-1">Error</AlertTitle>
        <AlertDescription className="ml-1">
          Your session has expired. Please log in again.
        </AlertDescription>
        <button
          onClick={() => {}}
          className="absolute right-4 top-4"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>
      </Alert>
    );
  },
);
GenericDialog.displayName = 'GenericDialog';

export { GenericDialog };
