import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import { cn } from 'src/lib';
import { FormLabelProps, FormMessageProps } from './types';
import { Label } from './Label/Label';

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return <div ref={ref} className={cn('space-y-2', className)} {...props} />;
});
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  FormLabelProps
>(({ className, hasError, ...props }, ref) => {
  return (
    <Label
      ref={ref}
      className={cn(hasError && 'text-red-400 dark:text-red-800', className)}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  return <Slot ref={ref} {...props} />;
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return <p ref={ref} className={cn('text-[0.8rem]', className)} {...props} />;
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, message, variant = null, ...props }, ref) => {
    const body = message || children;

    if (!body) {
      return null;
    }

    return (
      <p
        ref={ref}
        className={cn(
          'text-[0.8rem] font-medium text-red-400 dark:text-red-800',
          variant === 'info' && 'text-blue-400 dark:text-blue-800',
          variant === 'success' && 'text-green-400 dark:text-green-800',
          variant === 'warning' && 'text-yellow-400 dark:text-yellow-800',
          className,
        )}
        {...props}
      >
        {body}
      </p>
    );
  },
);
FormMessage.displayName = 'FormMessage';

export { FormItem, FormLabel, FormControl, FormDescription, FormMessage };
