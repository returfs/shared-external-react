import { VariantProps } from 'class-variance-authority';
import {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import { buttonVariants } from './Button';

// Todo: remove this if badasukerubin decides to install the icons package
export type IconWeight =
  | 'thin'
  | 'light'
  | 'regular'
  | 'bold'
  | 'fill'
  | 'duotone';

export interface IconProps
  extends ComponentPropsWithoutRef<'svg'>,
    RefAttributes<SVGSVGElement> {
  alt?: string;
  color?: string;
  size?: string | number;
  weight?: IconWeight;
  mirrored?: boolean;
}
export type Icon = ForwardRefExoticComponent<IconProps>;

export interface ColorButtonProps extends ComponentPropsWithoutRef<'button'> {
  color: string;
  isActive?: boolean;
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isActive?: boolean;
}
