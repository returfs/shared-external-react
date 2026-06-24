import { useCallback, useLayoutEffect, useRef, useState } from 'react';

/**
 * Measures a horizontal row and reports how many of its leading children fit the
 * available width, so the rest can be moved into an overflow ("More") menu.
 *
 * Strategy — a hidden measurement pass (deterministic, no flicker):
 *  - The consumer renders an off-screen row of ALL items (`measureRef`) plus a
 *    standalone "More" button (`moreRef`); these are measured but never shown.
 *  - A `ResizeObserver` on the visible container (`containerRef`) — and on the
 *    measurement row, to catch item/content/font-width changes — recomputes how
 *    many leading items fit. If they ALL fit, no width is reserved for "More";
 *    otherwise the More-button width (+ one gap) is reserved.
 *
 * Returns the refs to attach and `visibleCount`. Collapse is right-to-left
 * (declared order survives left-to-right), so declare high-priority/pinned items
 * first. When nothing fits, `visibleCount` is 0 → a single "More" kebab.
 */
export function useOverflowMenu(itemCount: number) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const moreRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(itemCount);

  const recompute = useCallback(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const available = container.clientWidth;
    if (available <= 0) return;

    const children = Array.from(measure.children) as HTMLElement[];
    const gap = parseFloat(getComputedStyle(measure).columnGap || '0') || 0;

    // Does everything fit without a "More" button?
    const total = children.reduce(
      (sum, child, i) => sum + child.offsetWidth + (i > 0 ? gap : 0),
      0,
    );

    let next: number;
    if (total <= available) {
      next = children.length;
    } else {
      const moreWidth = moreRef.current?.offsetWidth ?? 0;
      const budget = available - moreWidth - gap;
      let used = 0;
      let count = 0;
      for (let i = 0; i < children.length; i++) {
        const w = children[i].offsetWidth + (i > 0 ? gap : 0);
        if (used + w <= budget) {
          used += w;
          count++;
        } else {
          break;
        }
      }
      next = count;
    }

    setVisibleCount(prev => (prev === next ? prev : next));
  }, []);

  useLayoutEffect(() => {
    recompute();

    const ro = new ResizeObserver(() => recompute());
    if (containerRef.current) ro.observe(containerRef.current);
    if (measureRef.current) ro.observe(measureRef.current);

    return () => ro.disconnect();
    // Re-observe/recompute whenever the item set changes.
  }, [recompute, itemCount]);

  return { containerRef, measureRef, moreRef, visibleCount };
}
