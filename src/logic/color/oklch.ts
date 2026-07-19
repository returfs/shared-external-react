/**
 * Minimal, dependency-free sRGB <-> OKLab/OKLCH conversion.
 *
 * OKLab is a perceptual colour space (Björn Ottosson, 2020) whose lightness
 * axis behaves far more evenly than HSL/HSV, which is exactly what we need to
 * derive a Tailwind-like 50..950 accent ramp from a single base colour without
 * washed-out or neon steps. Kept dependency-free on purpose: this ships inside
 * the published extension SDK, so we avoid adding a runtime dependency.
 */

export interface Rgb {
  r: number; // 0..1
  g: number;
  b: number;
}

export interface Oklch {
  l: number; // 0..1 (perceptual lightness)
  c: number; // chroma (>= 0)
  h: number; // hue in degrees 0..360
}

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/** Parse a #rgb / #rrggbb hex string into 0..1 RGB. Returns null if invalid. */
export function hexToRgb(hex: string): Rgb | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  }
  const int = parseInt(h, 16);
  return {
    r: ((int >> 16) & 255) / 255,
    g: ((int >> 8) & 255) / 255,
    b: (int & 255) / 255,
  };
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const to = (n: number) =>
    Math.round(clamp01(n) * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${to(r)}${to(g)}${to(b)}`;
}

// sRGB gamma <-> linear light.
const toLinear = (c: number): number =>
  c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
const toGamma = (c: number): number =>
  c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;

export function rgbToOklch({ r, g, b }: Rgb): Oklch {
  const lr = toLinear(r);
  const lg = toLinear(g);
  const lb = toLinear(b);

  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

  const c = Math.sqrt(a * a + bb * bb);
  let h = (Math.atan2(bb, a) * 180) / Math.PI;
  if (h < 0) h += 360;
  return { l: L, c, h };
}

export function oklchToRgb({ l: L, c, h }: Oklch): Rgb {
  const hr = (h * Math.PI) / 180;
  const a = c * Math.cos(hr);
  const bb = c * Math.sin(hr);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * bb;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * bb;
  const s_ = L - 0.0894841775 * a - 1.291485548 * bb;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const lr = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  return {
    r: clamp01(toGamma(lr)),
    g: clamp01(toGamma(lg)),
    b: clamp01(toGamma(lb)),
  };
}

/** Relative luminance (WCAG) of an 0..1 RGB colour, for contrast decisions. */
export function relativeLuminance({ r, g, b }: Rgb): number {
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}
