import { Color } from '../../styles/colors/Theme/types';

export enum ResourceSettingsData {
  // Theme
  ThemeColor = 'theme-color',
}

export enum TurfView {
  Icon = 'icon',
  Table = 'table',
  Stack = 'stack',
}

export interface ResourceSettings {
  [ResourceSettingsData.ThemeColor]: keyof Color;
}
