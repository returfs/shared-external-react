import React from 'react';
import { cn } from '../../../lib';
import { Skeleton } from '../Skeleton/Skeleton';

function CardSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn('h-48 w-full rounded-lg', className)} />;
}

function CardHeaderSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)}>
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-48" />
    </div>
  );
}

function CardContentSkeleton({
  className,
  lines = 3,
}: {
  className?: string;
  lines?: number;
}) {
  return (
    <div className={cn('flex flex-col gap-2 p-6 pt-0', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn('h-4', index === lines - 1 ? 'w-3/4' : 'w-full')}
        />
      ))}
    </div>
  );
}

function CardFooterSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2 p-6 pt-0', className)}>
      <Skeleton className="h-9 w-24 rounded-md" />
      <Skeleton className="h-9 w-24 rounded-md" />
    </div>
  );
}

function CardFullSkeleton({
  className,
  showFooter = true,
  cardContentLines = 3,
}: {
  className?: string;
  showFooter?: boolean;
  cardContentLines?: number;
}) {
  return (
    <div
      className={cn(
        'rounded-lg border border-neutral-200 dark:border-neutral-800',
        className,
      )}
    >
      <CardHeaderSkeleton />
      <CardContentSkeleton lines={cardContentLines} />
      {showFooter && <CardFooterSkeleton />}
    </div>
  );
}

export {
  CardSkeleton,
  CardHeaderSkeleton,
  CardContentSkeleton,
  CardFooterSkeleton,
  CardFullSkeleton,
};
