import React from 'react';
import { cn } from '../../../../lib';
import { Skeleton } from '../../Skeleton';

function InputSkeleton({
  className,
  withLabel = false,
}: {
  className?: string;
  withLabel?: boolean;
}) {
  if (withLabel) {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-full rounded-lg" />
      </div>
    );
  }

  return <Skeleton className={cn('h-9 w-full rounded-lg', className)} />;
}

export { InputSkeleton };
