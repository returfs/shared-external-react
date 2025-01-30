import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { ComponentHasIsActive } from '../../types';
import { cn } from 'src/lib';
import { useTheme } from 'src/state';

import {
  ColorKey,
  fiveHundredFourHundredTextColors,
  fiveHundredSixHundredRingColors,
  neutralNineHundredBgColors,
  surfaceBorderColors,
  threeHundredOverSeventySevenHundredOverSeventyBorderColors,
} from 'src/styles';

const cardVariants = (colorKey: ColorKey) =>
  cva('rounded-lg border', {
    variants: {
      borderVariant: {
        default: cn('', surfaceBorderColors),
        error:
          'border-red-300 transition-colors duration-200 dark:border-red-700 [&>svg]:text-red-800 dark:[&>svg]:text-red-200',
        success:
          'border-green-300 transition-colors duration-200 dark:border-green-700 [&>svg]:text-green-800 dark:[&>svg]:text-green-200',
        warning:
          'border-yellow-300 transition-colors duration-200 dark:border-yellow-700 [&>svg]:text-yellow-800 dark:[&>svg]:text-yellow-200',
        info: 'border-blue-300 transition-colors duration-200 dark:border-blue-700 [&>svg]:text-blue-800 dark:[&>svg]:text-blue-200',
        color:
          threeHundredOverSeventySevenHundredOverSeventyBorderColors[colorKey],
      },
      backgroundVariant: {
        default: cn('', neutralNineHundredBgColors),
        error: 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200',
        success:
          'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200',
        warning:
          'bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        info: 'bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      },
    },
    defaultVariants: {
      borderVariant: 'default',
      backgroundVariant: 'default',
    },
  });

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<ReturnType<typeof cardVariants>>,
    ComponentHasIsActive {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, borderVariant, backgroundVariant, isActive = false, ...props },
    ref,
  ) => {
    const { colorKey } = useTheme();
    const bv = cardVariants(colorKey);

    return (
      <div
        ref={ref}
        className={cn(
          bv({ borderVariant, backgroundVariant, className }),
          isActive && cn('ring-1', fiveHundredSixHundredRingColors[colorKey]),
        )}
        {...props}
      />
    );
  },
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { colorKey } = useTheme();

  return (
    <div
      ref={ref}
      className={cn(
        'text-sm',
        fiveHundredFourHundredTextColors[colorKey],
        className,
      )}
      {...props}
    />
  );
});
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
