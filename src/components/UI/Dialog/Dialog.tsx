import { X } from '@phosphor-icons/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { cn } from '../../../lib';
import { useTheme } from '../../../state';
import {
  dataStateOpenTwoHundredEightHundredBgColors,
  fiveHundredFourHundredTextColors,
} from '../../../styles';
import { surfaceBgAndBorderColors } from '../../../styles/colors/Group';
import { nineFiftyThreeHundredFocusRingColors } from '../../../styles/colors/Ring';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-neutral-950/30 backdrop-blur-[2px]',
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    onClose?: () => void;
  }
>(({ className, children, onClose, ...props }, ref) => {
  const { colorKey } = useTheme();

  return (
    // Portal to body (like AlertDialog): without it, a dialog opened from
    // inside a stacking context (e.g. the fixed z-10 sidebar) gets trapped
    // there and any z-indexed main content paints over it.
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg',
          surfaceBgAndBorderColors,
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className={cn(
            'rounded-xs focus:outline-hidden absolute right-4 top-4 opacity-70 ring-offset-neutral-500 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:text-neutral-500 dark:data-[state=open]:text-neutral-400',
            dataStateOpenTwoHundredEightHundredBgColors,
            nineFiftyThreeHundredFocusRingColors[colorKey],
          )}
          onClick={onClose && (() => onClose())}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'w-full whitespace-normal text-lg font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => {
  const { colorKey } = useTheme();

  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn(
        'max-h-80 w-full whitespace-normal break-keep text-sm',
        fiveHundredFourHundredTextColors[colorKey],
        className,
      )}
      {...props}
    />
  );
});
DialogDescription.displayName = DialogPrimitive.Description.displayName;
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
