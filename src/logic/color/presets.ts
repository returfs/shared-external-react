import { ColorKey } from '../Data/types';

/**
 * Base hex for each preset swatch. These seed the accent ramp, so they are the
 * mid-tone (~Tailwind -500) of each hue — the ramp derives the 50..950 steps
 * from them. Custom colours from the wheel bypass this map entirely.
 */
export const PRESET_HEX: Record<ColorKey, string> = {
  [ColorKey.Red]: '#ef4444',
  [ColorKey.Orange]: '#f97316',
  [ColorKey.Yellow]: '#eab308',
  [ColorKey.Gray]: '#6b7280',
  [ColorKey.Green]: '#22c55e',
  [ColorKey.Blue]: '#3b82f6',
  [ColorKey.Indigo]: '#6366f1',
  [ColorKey.Violet]: '#8b5cf6',
  [ColorKey.Purple]: '#a855f7',
  [ColorKey.Pink]: '#ec4899',
};

/** Resolve a stored theme value (preset key or raw hex) to a base hex. */
export function resolveAccentHex(value: string | null | undefined): string {
  if (!value) return PRESET_HEX[ColorKey.Gray];
  if (value.startsWith('#')) return value;
  return PRESET_HEX[value as ColorKey] ?? PRESET_HEX[ColorKey.Gray];
}
