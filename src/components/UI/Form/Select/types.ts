import { Item, Trigger } from '@radix-ui/react-select';
import { ComponentPropsWithoutRef } from 'react';

export interface SelectProps extends ComponentPropsWithoutRef<typeof Trigger> {}

export interface SelectItemProps
  extends ComponentPropsWithoutRef<typeof Item> {}
