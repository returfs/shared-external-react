import { Color, ThemeVariant } from 'src/styles/colors/Theme/types';

export enum SettingsData {
  // Layout
  SidebarOpen = 'sidebar-open',
  SidebarWidth = 'sidebar-width',

  // Theme
  ThemeVariant = 'theme-variant',
  ThemeColor = 'theme-color',

  // Turfs
  TurfView = 'turf-view',
}

export enum TurfView {
  Icon = 'icon',
  Table = 'table',
  Stack = 'stack',
}

export interface Settings {
  [SettingsData.ThemeVariant]: ThemeVariant;
  [SettingsData.ThemeColor]: keyof Color;
  [SettingsData.TurfView]: TurfView;
  [SettingsData.SidebarOpen]: string;
  [SettingsData.SidebarWidth]: number;
}
