import React from 'react';
import { cn } from '../../../lib';
import { Skeleton } from '../Skeleton';
import { InputSkeleton } from './Input/InputSkeleton';
import { ButtonSkeleton } from '../Buttons';

function FormItemSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-9 w-full rounded-lg" />
    </div>
  );
}

function FormSkeleton({
  className,
  fields = 3,
  showSubmit = true,
}: {
  className?: string;
  fields?: number;
  showSubmit?: boolean;
}) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {Array.from({ length: fields }).map((_, index) => (
        <InputSkeleton key={index} withLabel />
      ))}
      {showSubmit && <ButtonSkeleton size="lg" className="mt-2 w-full" />}
    </div>
  );
}

export { FormItemSkeleton, FormSkeleton };
