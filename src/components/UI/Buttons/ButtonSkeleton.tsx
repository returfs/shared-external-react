import React from 'react';
import { cn } from '../../../lib';
import { Skeleton } from '../Skeleton';

type ButtonSkeletonSize = 'link' | 'default' | 'sm' | 'lg' | 'icon' | 'menu';

const sizeClasses: Record<ButtonSkeletonSize, string> = {
  link: 'py-2',
  default: 'h-9 p-2',
  sm: 'h-8 rounded-lg px-2 text-xs',
  lg: 'h-10 rounded-lg px-8',
  icon: 'size-7 shrink-0 [&_svg]:size-4',
  menu: 'h-[30px] w-full rounded-none px-4 py-2',
};

function ButtonSkeleton({
  className,
  size = 'default',
}: {
  className?: string;
  size?: ButtonSkeletonSize;
}) {
  return (
    <Skeleton className={cn('rounded-lg', sizeClasses[size], className)} />
  );
}

export { ButtonSkeleton };
