import { HTMLAttributes } from 'react';
import { Settings } from 'src/components/Settings';
import { ColorKey } from 'src/styles/colors/Theme/types';

export interface EntranceProps extends HTMLAttributes<HTMLDivElement> {
  themeColor: ColorKey;
}

export interface PortalSystemProps {
  resourceRoute: string;
  settings: Settings;
}
