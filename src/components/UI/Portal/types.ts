import { HTMLAttributes, ReactNode } from 'react';
import { ColorKey } from '../../../logic';
import {
  ResourceItem,
  ResourceSettings,
  ResourceUser,
} from '../../../logic/Models/types';

export interface EntranceProps extends HTMLAttributes<HTMLDivElement> {
  themeColor: ColorKey;
}

export interface EntranceHeaderProps extends HTMLAttributes<HTMLDivElement> {
  fullname: string;
  children: ReactNode;
}

export interface PortalSystemPropsRequired {
  resourceItem: ResourceItem;
  resourceSettings: ResourceSettings;
  resourceUser: ResourceUser;
}

export interface PortalSystemProps extends PortalSystemPropsRequired {}
