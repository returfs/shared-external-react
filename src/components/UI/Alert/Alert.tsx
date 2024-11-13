import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'src/lib';

const alertVariants = cva(
  'absolute left-0 right-0 top-0 z-50 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm dark:border-neutral-800 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-neutral-950 dark:[&>svg]:text-neutral-50 [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        error:
          'border-red-500 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-900 dark:text-red-200 [&>svg]:text-red-800 dark:[&>svg]:text-red-200',
        success:
          'border-green-500 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-900 dark:text-green-200 [&>svg]:text-green-800 dark:[&>svg]:text-green-200',
        warning:
          'border-yellow-500 bg-yellow-50 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-900 dark:text-yellow-200 [&>svg]:text-yellow-800 dark:[&>svg]:text-yellow-200',
        info: 'border-blue-500 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-900 dark:text-blue-200 [&>svg]:text-blue-800 dark:[&>svg]:text-blue-200',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
