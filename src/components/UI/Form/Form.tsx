import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import { cn } from 'src/lib';
import { Label } from './Label/label';
import { FormMessageProps } from './types';

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
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  //   const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={className}
      //   className={cn(error && 'text-red-500 dark:text-red-900', className)}
      //   htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  //   const { error, formItemId, formDescriptionId, formMessageId } =
  //     useFormField();

  return (
    <Slot
      ref={ref}
      //   id={formItemId}
      //   aria-describedby={
      //     !error
      //       ? `${formDescriptionId}`
      //       : `${formDescriptionId} ${formMessageId}`
      //   }
      //   aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        'text-[0.8rem] text-neutral-500 dark:text-neutral-400',
        className,
      )}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, message, ...props }, ref) => {
    const body = message || children;

    if (!body) {
      return null;
    }

    return (
      <p
        ref={ref}
        className={cn(
          'text-[0.8rem] font-medium text-red-500 dark:text-red-900',
          className,
        )}
        {...props}
      >
        {children}
      </p>
    );
  },
);
FormMessage.displayName = 'FormMessage';

export { FormItem, FormLabel, FormControl, FormDescription, FormMessage };
