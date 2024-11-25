import { HTMLAttributes } from 'react';
import { Settings } from '../../Settings/types';
import { ColorKey } from '../../../styles/colors/Theme/types';

export interface EntranceProps extends HTMLAttributes<HTMLDivElement> {
  themeColor: ColorKey;
}

export interface PortalSystemProps {
  resourceRoute: string;
  settings: Settings;
}
