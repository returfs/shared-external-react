import { type VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';
import { type surfaceVariants } from './Surface';

export interface SurfaceProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof surfaceVariants> {}
