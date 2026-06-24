import React from 'react';
import { cn } from '../../../lib';
import { Skeleton } from '../Skeleton/Skeleton';

function FieldSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex w-full flex-col gap-3', className)}>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-9 w-full rounded-lg" />
    </div>
  );
}

function FieldGroupSkeleton({
  className,
  count = 3,
}: {
  className?: string;
  count?: number;
}) {
  return (
    <div className={cn('flex w-full flex-col gap-7', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <FieldSkeleton key={index} />
      ))}
    </div>
  );
}

function FieldSetSkeleton({
  className,
  count = 2,
}: {
  className?: string;
  count?: number;
}) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <Skeleton className="mb-3 h-5 w-32" />
      {Array.from({ length: count }).map((_, index) => (
        <FieldSkeleton key={index} />
      ))}
    </div>
  );
}

export { FieldSkeleton, FieldGroupSkeleton, FieldSetSkeleton };
