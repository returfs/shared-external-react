import { forwardRef, Ref } from 'react';
import { cn } from '../../../lib';
import { Surface } from '../../Grids';
import { HeaderMenuBar } from '../MenuBar';
import { EntranceHeaderProps } from './types';
import { turfPx } from '../../../styles';
import { useViewMode } from '../../../state/viewMode';

/**
 * Extension header shell. Optionally two rows:
 *  - menubar : macOS-style menu-bar row (App menu + File/Edit/View), shown only
 *              when `menubar` is provided. Sits ABOVE the toolbar row.
 *  - toolbar : start (`fullname`/`title`) · `menu` (responsive `HeaderMenuBar`,
 *              or legacy `children`) · `end` (status / actions, e.g. SaveStatus)
 *
 * The whole header is `sticky top-0` so it never scrolls with the body. Passing
 * `children` (instead of `menu`) preserves the original horizontal scroll for
 * back-compat.
 */
const EntranceHeader = forwardRef<HTMLDivElement, EntranceHeaderProps>(
  (
    { fullname, title, menubar, menu, end, children },
    ref: Ref<HTMLDivElement>,
  ) => {
    const { isFullscreen } = useViewMode();

    // Full screen hides even the extension's own header — content only. The
    // host renders a hover/Esc control to exit.
    if (isFullscreen) return null;

    return (
      <Surface
        ref={ref}
        className="sticky inset-x-0 top-0 z-50 mx-auto mb-2 flex w-full select-none flex-col overflow-hidden"
      >
        {/* macOS-style menu-bar row — flush inside the same card, separated from
            the toolbar by a hairline so the two rows read as one header. */}
        {menubar && (
          <div
            className={cn(
              'flex h-9 w-full items-center border-b border-neutral-200 dark:border-neutral-800',
              turfPx,
            )}
          >
            <HeaderMenuBar
              items={menubar}
              appearance="menubar"
              className="min-w-0 flex-1"
            />
          </div>
        )}

        <div
          className={cn(
            'flex h-9 w-full items-center divide-x divide-neutral-200 dark:divide-neutral-800',
            turfPx,
          )}
        >
          <div className="flex min-w-0 shrink items-center gap-2 overflow-hidden pr-2 lg:pr-3">
            {title ?? (
              <span className="scrollbar-cloak block overflow-x-auto whitespace-nowrap text-xs font-medium">
                {fullname}
              </span>
            )}
          </div>

          <div className="flex min-w-0 flex-1 items-center gap-2 pl-2 lg:pl-3">
            {menu ? (
              <HeaderMenuBar items={menu} className="min-w-0 flex-1" />
            ) : (
              <div className="scrollbar-cloak flex min-w-0 flex-1 flex-nowrap items-center justify-end overflow-x-scroll">
                {children}
              </div>
            )}

            {end && (
              <div className="flex shrink-0 items-center gap-2 pl-2">{end}</div>
            )}
          </div>
        </div>
      </Surface>
    );
  },
);

export default EntranceHeader;
