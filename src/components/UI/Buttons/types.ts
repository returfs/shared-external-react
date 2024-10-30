import { ButtonProps } from '@chakra-ui/react';
import {
  ComponentPropsWithoutRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

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

export interface GenericButtonProps extends ButtonProps {}

export interface IconButtonProps extends ButtonProps {}

export interface IconTextButtonProps extends GenericButtonProps {
  icon?: Icon;
  text: string;
}

export interface ColorButtonProps extends ButtonProps {}
