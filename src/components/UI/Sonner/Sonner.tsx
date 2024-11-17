import React, { ComponentProps } from 'react';
import { toast, Toaster as Sonner } from 'sonner';
import { cn } from 'src/lib';
import { useTheme } from 'src/state';
import { nineFiftyTwoHundredToasterTextColors } from 'src/styles';
import { CheckCircle, Info, WarningCircle } from '@phosphor-icons/react';

type ToasterProps = ComponentProps<typeof Sonner>;

const Toaster = ({ className, ...props }: ToasterProps) => {
  const { colorKey } = useTheme();

  return (
    <Sonner
      className={cn('toaster group', className)}
      icons={{
        error: <WarningCircle className="size-5" />,
        success: <CheckCircle className="size-5" />,
        warning: <WarningCircle className="size-5" />,
        info: <Info className="size-5" />,
      }}
      toastOptions={{
        classNames: {
          error: cn(
            'group toast group-[.toaster]:bg-red-50 group-[.toaster]:text-red-950 group-[.toaster]:border-red-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-red-800 dark:group-[.toaster]:text-red-200 dark:group-[.toaster]:border-red-700 group-[.toast]:text-red-500 dark:group-[.toast]:text-red-400',
          ),
          success: cn(
            'group toast group-[.toaster]:bg-green-50 group-[.toaster]:text-green-950 group-[.toaster]:border-green-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-green-800 dark:group-[.toaster]:text-green-200 dark:group-[.toaster]:border-green-700 group-[.toast]:text-green-500 dark:group-[.toast]:text-green-400',
          ),
          warning: cn(
            'group toast group-[.toaster]:bg-yellow-50 group-[.toaster]:text-yellow-950 group-[.toaster]:border-yellow-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-yellow-800 dark:group-[.toaster]:text-yellow-200 dark:group-[.toaster]:border-yellow-700 group-[.toast]:text-yellow-500 dark:group-[.toast]:text-yellow-400',
          ),
          info: cn(
            'group toast group-[.toaster]:bg-blue-50 group-[.toaster]:text-blue-950 group-[.toaster]:border-blue-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-blue-800 dark:group-[.toaster]:text-blue-200 dark:group-[.toaster]:border-blue-700 group-[.toast]:text-blue-500 dark:group-[.toast]:text-blue-400',
          ),
          toast: cn(
            'group toast group-[.toaster]:bg-neutral-50 group-[.toaster]:border-neutral-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-neutral-800 dark:group-[.toaster]:border-neutral-700 ',
            nineFiftyTwoHundredToasterTextColors[colorKey],
          ),
          actionButton:
            'group-[.toast]:bg-blue-50 group-[.toast]:text-blue-800 dark:group-[.toast]:bg-blue-900 dark:group-[.toast]:text-blue-200 h-8 rounded-lg px-3 text-xs',
          cancelButton:
            'group-[.toast]:bg-red-50 group-[.toast]:text-red-800 dark:group-[.toast]:bg-red-900 dark:group-[.toast]:text-red-200 h-8 rounded-lg px-3 text-xs',
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
