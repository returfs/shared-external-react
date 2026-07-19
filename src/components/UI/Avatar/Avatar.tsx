import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '../../../lib';
import { neutralTwoHundredEightHundredBorderColors } from '../../../styles/colors/Border';
import { AvatarProps } from './types';
import { neutralThreeHundredSixHundredFocusVisibleRingColors } from '../../../styles';

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, ...props }, ref) => {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex size-7 shrink-0 cursor-pointer overflow-hidden rounded-full border',
        neutralTwoHundredEightHundredBorderColors,
        neutralThreeHundredSixHundredFocusVisibleRingColors,
        className,
      )}
      {...props}
    />
  );
});
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800',
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
