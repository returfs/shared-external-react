import { Root } from '@radix-ui/react-avatar';
import { ComponentHasColorKey } from '../../types';

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof Root>,
    ComponentHasColorKey {}
