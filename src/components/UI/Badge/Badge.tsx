import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'src/lib';
import { useTheme } from 'src/state';
import { nineFiftyTwoHundredBorderColors } from 'src/styles/colors/Border';
import {
  ColorKey,
  eightHundredOneHundredBgColors,
  oneHundredEightHundredTextColors,
} from 'src/styles';

const badgeVariants = (colorKey: ColorKey) =>
  cva(
    'inline-flex items-center rounded-lg border px-[7px] py-[1px] text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 dark:focus:ring-neutral-300',
    {
      variants: {
        variant: {
          default: cn(
            'border-transparent shadow hover:opacity-80',
            oneHundredEightHundredTextColors[colorKey],
            eightHundredOneHundredBgColors[colorKey],
          ),
          error:
            'border-red-500 bg-red-50 text-red-800 shadow-sm dark:border-red-900 dark:bg-red-900 dark:text-red-200',
          success:
            'border-green-500 bg-green-50 text-green-800 shadow-sm dark:border-green-900 dark:bg-green-900 dark:text-green-200',
          warning:
            'border-yellow-500 bg-yellow-50 text-yellow-800 shadow-sm dark:border-yellow-900 dark:bg-yellow-900 dark:text-yellow-200',
          info: 'border-blue-500 bg-blue-50 text-blue-800 shadow-sm dark:border-blue-900 dark:bg-blue-900 dark:text-blue-200',
          outline: cn(nineFiftyTwoHundredBorderColors[colorKey]),
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    },
  );

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<ReturnType<typeof badgeVariants>> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  const { colorKey } = useTheme();
  const bv = badgeVariants(colorKey);

  return <div className={cn(bv({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
