import React from 'react';
import { cn } from '../../lib';
import { Skeleton } from '../UI/Skeleton/Skeleton';

function SurfaceSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn('h-48 w-full rounded-lg', className)} />;
}

function SurfaceHeaderSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col space-y-2 p-4', className)}>
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-4 w-48" />
    </div>
  );
}

function SurfaceContentSkeleton({
  className,
  lines = 3,
}: {
  className?: string;
  lines?: number;
}) {
  return (
    <div className={cn('flex flex-col gap-2 p-4 pt-0', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn('h-4', index === lines - 1 ? 'w-3/4' : 'w-full')}
        />
      ))}
    </div>
  );
}

function SurfaceFullSkeleton({
  className,
  contentLines = 3,
}: {
  className?: string;
  contentLines?: number;
}) {
  return (
    <div
      className={cn(
        'shadow-xs rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950',
        className,
      )}
    >
      <SurfaceHeaderSkeleton />
      <SurfaceContentSkeleton lines={contentLines} />
    </div>
  );
}

export {
  SurfaceSkeleton,
  SurfaceHeaderSkeleton,
  SurfaceContentSkeleton,
  SurfaceFullSkeleton,
};
