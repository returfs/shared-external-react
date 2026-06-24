import { forwardRef, Ref } from 'react';
import { cn } from '../../../lib';
import { Surface } from '../../Grids';
import { HeaderMenuBar } from '../MenuBar';
import { EntranceHeaderProps } from './types';
import { turfPx } from '../../../styles';

/**
 * Extension header shell with three regions:
 *  - start  : document name (`fullname`) or a custom `title`
 *  - menu   : declarative `menu` (renders a responsive `HeaderMenuBar` that
 *             collapses overflow into a "More" menu) — or legacy `children`
 *  - end    : status / primary actions (e.g. SaveStatus)
 *
 * Stays `sticky top-0` and a fixed height so it never scrolls with the body.
 * Passing `children` (instead of `menu`) preserves the original horizontal
 * scroll behavior for back-compat.
 */
const EntranceHeader = forwardRef<HTMLDivElement, EntranceHeaderProps>(
  ({ fullname, title, menu, end, children }, ref: Ref<HTMLDivElement>) => {
    return (
      <Surface
        className={cn(
          'sticky inset-x-0 top-0 z-50 mx-auto mb-2 flex h-[46px] w-full select-none flex-row items-center divide-x',
          turfPx,
        )}
        ref={ref}
      >
        <div className="flex min-w-0 shrink items-center gap-2 overflow-hidden pr-2 lg:pr-3">
          {title ?? (
            <span className="text-bold scrollbar-cloak block overflow-x-auto whitespace-nowrap text-sm">
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
      </Surface>
    );
  },
);

export default EntranceHeader;
