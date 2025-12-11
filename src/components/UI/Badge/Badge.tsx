import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib';
import { useTheme } from '../../../state';
import { nineFiftyTwoHundredBorderColors } from '../../../styles/colors/Border';
import { eightHundredOneHundredBgColors } from '../../../styles/colors/Background/Background';
import { oneHundredEightHundredTextColors } from '../../../styles/colors/Text/Text';
import { ColorKey } from '../../../logic/Data';

const badgeVariants = (colorKey: ColorKey) =>
  cva(
    'focus:outline-hidden inline-flex items-center rounded-lg border px-[7px] py-px text-xs font-semibold transition-colors focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 dark:focus:ring-neutral-300',
    {
      variants: {
        variant: {
          default: cn(
            'border-transparent shadow-sm hover:opacity-80',
            oneHundredEightHundredTextColors[colorKey],
            eightHundredOneHundredBgColors[colorKey],
          ),
          error:
            'shadow-xs border-red-500 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-900 dark:text-red-200',
          success:
            'shadow-xs border-green-500 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-900 dark:text-green-200',
          warning:
            'shadow-xs border-yellow-500 bg-yellow-50 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-900 dark:text-yellow-200',
          info: 'shadow-xs border-blue-500 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-900 dark:text-blue-200',
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
