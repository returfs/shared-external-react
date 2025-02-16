import { HTMLAttributes } from 'react';
import { ResourceSettings } from '../../Settings/types';
import { ColorKey } from '../../../styles/colors/Theme/types';
import { ResourceItem, ResourceUser } from 'src/logic/types';

export interface EntranceProps extends HTMLAttributes<HTMLDivElement> {
  themeColor: ColorKey;
}

interface PortalSystemPropsRequired {
  resourceItem: ResourceItem;
  resourceRoute: string;
  resourceSettings: ResourceSettings;
  resourceUser: ResourceUser;
  onResourceUpdate: (resource: File) => void;
}

export type PortalSystemProps = Partial<PortalSystemPropsRequired>;
