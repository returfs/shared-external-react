import { Item, Trigger } from '@radix-ui/react-select';
import { ComponentHasColorKey } from '../../../types';
import { ComponentPropsWithoutRef } from 'react';

export interface SelectProps
  extends ComponentPropsWithoutRef<typeof Trigger>,
    ComponentHasColorKey {}

export interface SelectItemProps
  extends ComponentPropsWithoutRef<typeof Item>,
    ComponentHasColorKey {}
