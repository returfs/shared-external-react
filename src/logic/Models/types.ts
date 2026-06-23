import { ResourceSettingsData } from '../Data';
import { Color, HexColorKey } from '../Data/types';

export type DateTime = string;

export interface Model {
  id: string;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface ResourceItem extends Model {
  name: string;
  extension: string;
  route: string;
  updateRoute?: string;
  onUpdate?: (resource: File) => void;
}

export interface ResourceUser extends Model {
  name: string;
  username: string;
}

export interface ResourceSettings {
  [ResourceSettingsData.ThemeColor]: keyof Color;
  [ResourceSettingsData.HexThemeColor]?: keyof HexColorKey;
}
