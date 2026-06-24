import { forwardRef, Ref } from 'react';
// import { Surface } from '../../../src/components/Grids';
import { cn } from '../../../lib';
import { turfPx } from '../../../styles';
import { Surface } from '../../Grids';
import { EntranceHeaderProps } from './types';

const EntranceHeader = forwardRef<HTMLDivElement, EntranceHeaderProps>(
  ({ fullname, children }, ref: Ref<HTMLDivElement>) => {
    return (
      <>
        <Surface
          className={cn(
            'sticky inset-x-0 top-0 z-50 mx-auto mb-2 flex h-[46px] w-full select-none flex-row items-center justify-between divide-x',
            turfPx,
          )}
          ref={ref}
        >
          <div className="flex min-w-0 shrink items-center gap-2 overflow-hidden pr-2 lg:pr-3">
            <span className="text-bold scrollbar-cloak block overflow-x-auto whitespace-nowrap text-sm">
              {fullname}
            </span>
          </div>

          <div className="scrollbar-cloak flex flex-nowrap items-center justify-end overflow-x-scroll pl-2 lg:pl-3">
            {children}
          </div>
        </Surface>
      </>
    );
  },
);

export default EntranceHeader;
