import { ComponentHasColorKey, ComponentHasIcon } from '../../../types';
import { InputHTMLAttributes } from 'react';

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    ComponentHasColorKey,
    ComponentHasIcon {}
