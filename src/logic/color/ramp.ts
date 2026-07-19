/**
 * Accent ramp generation.
 *
 * Turns a single base hex (from a preset swatch or the colour wheel) into a
 * Tailwind-like 50..950 scale, expressed as CSS custom properties. The accent
 * colour maps (styles/colors/*) reference these variables via
 * `bg-(--accent-200) dark:bg-(--accent-800)` etc., so changing the base colour
 * only changes the variable *values* — no Tailwind classes are generated at
 * runtime (that's impossible) and no call sites change.
 *
 * The ramp is mode-independent: light UI uses the lighter steps (e.g. 200) and
 * dark UI uses the darker steps (e.g. 800) via the existing `dark:` variant,
 * exactly as the old fixed palette did.
 */
import {
  hexToRgb,
  oklchToRgb,
  rgbToHex,
  rgbToOklch,
  relativeLuminance,
} from './oklch';

export const ACCENT_STEPS = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;

export type AccentStep = (typeof ACCENT_STEPS)[number];

// Target perceptual lightness (OKLab L) per step, approximating Tailwind's own
// palette curve so existing presets look ~unchanged.
const TARGET_L: Record<AccentStep, number> = {
  50: 0.971,
  100: 0.936,
  200: 0.885,
  300: 0.808,
  400: 0.704,
  500: 0.637,
  600: 0.577,
  700: 0.505,
  800: 0.443,
  900: 0.396,
  950: 0.261,
};

// Chroma is pulled in toward the extremes so the lightest/darkest steps don't
// look neon; the mid-range keeps the base colour's full saturation.
const CHROMA_SCALE: Record<AccentStep, number> = {
  50: 0.4,
  100: 0.55,
  200: 0.75,
  300: 0.9,
  400: 1.0,
  500: 1.0,
  600: 0.95,
  700: 0.85,
  800: 0.75,
  900: 0.65,
  950: 0.5,
};

const DEFAULT_HEX = '#6b7280'; // gray-500, the historic default accent.

/** Generate the 50..950 hex ramp for a base colour. Falls back to gray. */
export function generateAccentRamp(
  baseHex: string,
): Record<AccentStep, string> {
  const rgb = hexToRgb(baseHex) ?? hexToRgb(DEFAULT_HEX)!;
  const { c, h } = rgbToOklch(rgb);

  const ramp = {} as Record<AccentStep, string>;
  for (const step of ACCENT_STEPS) {
    ramp[step] = rgbToHex(
      oklchToRgb({ l: TARGET_L[step], c: c * CHROMA_SCALE[step], h }),
    );
  }
  return ramp;
}

/**
 * The CSS custom properties for a base colour: `--accent-50`..`--accent-950`
 * plus `--accent-fg-*` foreground colours (black/white by luminance) for the
 * light (200-ish) and dark (800-ish) accent surfaces.
 */
export function accentCssVars(baseHex: string): Record<string, string> {
  const ramp = generateAccentRamp(baseHex);
  const vars: Record<string, string> = {};
  for (const step of ACCENT_STEPS) {
    vars[`--accent-${step}`] = ramp[step];
  }
  const fgFor = (hex: string) =>
    relativeLuminance(hexToRgb(hex)!) > 0.5 ? '#0a0a0a' : '#fafafa';
  vars['--accent-fg-light'] = fgFor(ramp[200]);
  vars['--accent-fg-dark'] = fgFor(ramp[800]);
  return vars;
}

/** Serialise the vars into a CSS `:root { ... }` block for SSR inlining. */
export function accentCssText(baseHex: string): string {
  const vars = accentCssVars(baseHex);
  const body = Object.entries(vars)
    .map(([k, v]) => `${k}:${v}`)
    .join(';');
  return `:root{${body}}`;
}
