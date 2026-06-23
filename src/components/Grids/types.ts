import type {
  ElementType,
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
} from 'react';
import type { VariantProps } from 'class-variance-authority';
import { surfaceVariants } from './Surface';

type AsProp<T extends ElementType> = { as?: T };

export type PolymorphicProps<T extends ElementType, P = {}> = P &
  AsProp<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof P | 'as' | 'className'>;

export type SurfaceOwnProps = VariantProps<typeof surfaceVariants> & {
  className?: string;
};

export type SurfaceProps<T extends ElementType = 'div'> = PolymorphicProps<
  T,
  SurfaceOwnProps
>;

export type PolymorphicRef<T extends ElementType> =
  ComponentPropsWithRef<T>['ref'];
