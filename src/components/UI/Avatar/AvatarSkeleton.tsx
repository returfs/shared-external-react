import React from 'react';
import { cn } from '../../../lib';
import { Skeleton } from '../Skeleton/Skeleton';

function AvatarSkeleton({
  className,
  size = 'default',
}: {
  className?: string;
  size?: 'sm' | 'default' | 'lg' | 'xl';
}) {
  const sizeClasses = {
    sm: 'size-6',
    default: 'size-7',
    lg: 'size-12',
    xl: 'size-16',
  };

  return (
    <Skeleton
      className={cn('shrink-0 rounded-full', sizeClasses[size], className)}
    />
  );
}

function AvatarWithTextSkeleton({
  className,
  size = 'default',
}: {
  className?: string;
  size?: 'sm' | 'default' | 'lg' | 'xl';
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <AvatarSkeleton size={size} />
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
}

function AvatarGroupSkeleton({
  className,
  count = 3,
  size = 'default',
}: {
  className?: string;
  count?: number;
  size?: 'sm' | 'default' | 'lg' | 'xl';
}) {
  return (
    <div className={cn('flex -space-x-2', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <AvatarSkeleton
          key={index}
          size={size}
          className="ring-2 ring-white dark:ring-neutral-950"
        />
      ))}
    </div>
  );
}

export { AvatarSkeleton, AvatarWithTextSkeleton, AvatarGroupSkeleton };
