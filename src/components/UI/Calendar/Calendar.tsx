import * as React from 'react';
import {
  DateRange,
  DayButton,
  DayPicker,
  getDefaultClassNames,
} from 'react-day-picker';

import { CaretDown, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { cn } from '../../../lib/utils';
import { useTheme } from '../../../state';
import { Button, buttonVariants } from '../Buttons';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) {
  const { colorKey } = useTheme();
  const defaultClassNames = getDefaultClassNames();
  const bv = buttonVariants(colorKey, false);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      captionLayout={captionLayout as any}
      formatters={{
        formatMonthDropdown: (date: Date) =>
          date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn(
          'flex gap-4 flex-col md:flex-row relative',
          defaultClassNames.months,
        ),
        month: cn('flex flex-col w-full gap-4', defaultClassNames.month),
        nav: cn(
          'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
          defaultClassNames.nav,
        ),
        button_previous: cn(
          bv({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          bv({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          'flex items-center justify-center pt-1 relative items-center',
          defaultClassNames.month_caption,
        ),
        caption_label: cn(
          'text-sm font-medium select-none',
          captionLayout === 'label'
            ? 'text-sm'
            : 'rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5',
          defaultClassNames.caption_label,
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'rounded-md w-8 font-normal text-[0.8rem] select-none',
          defaultClassNames.weekday,
        ),
        week: cn('flex w-full mt-2', defaultClassNames.week),
        day: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-neutral-100 [&:has([aria-selected].day-outside)]:bg-neutral-100/50 [&:has([aria-selected].day-range-end)]:rounded-r-md dark:[&:has([aria-selected])]:bg-neutral-800 dark:[&:has([aria-selected].day-outside)]:bg-neutral-800/50',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md',
          defaultClassNames.day,
        ),
        range_start: cn('day-range-start', defaultClassNames.range_start),
        range_end: cn('day-range-end', defaultClassNames.range_end),
        today: cn(
          'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50',
          defaultClassNames.today,
        ),
        outside: cn(
          'day-outside text-neutral-500 aria-selected:bg-neutral-100/50 dark:text-neutral-400',
          defaultClassNames.outside,
        ),
        disabled: cn(
          'text-neutral-500 opacity-50 dark:text-neutral-400',
          defaultClassNames.disabled,
        ),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <CaretLeft className={cn('h-4 w-4', className)} {...props} />
            );
          }

          if (orientation === 'right') {
            return (
              <CaretRight className={cn('h-4 w-4', className)} {...props} />
            );
          }

          return <CaretDown className={cn('h-4 w-4', className)} {...props} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex h-8 items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'flex h-8 w-8 items-center justify-center p-0 font-normal aria-selected:opacity-100',
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
export type { DateRange };
