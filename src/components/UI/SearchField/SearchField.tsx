import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { Command as CommandPrimitive } from 'cmdk';
import * as React from 'react';
import { cn } from '../../../lib';
import { surfaceBorderColors } from '../../../styles/colors/Group';
import { Button } from '../Buttons';
import { Input } from '../Form';

export interface SearchFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
  > {
  value: string;
  /** Fires on typing AND when the clear button empties the field. */
  onValueChange: (value: string) => void;
  /**
   * `input` (default) renders a bordered standalone field; `command` renders a
   * cmdk-connected input for use inside <Command> so the list below keeps its
   * arrow-key navigation.
   */
  variant?: 'input' | 'command';
  /** command variant only: bottom border between the input and the list. */
  hasSeparator?: boolean;
  /** Class for the wrapper element; use `inputClassName` for the input. */
  className?: string;
  inputClassName?: string;
}

/**
 * The one search box: leading magnifying glass, editable placeholder, and a
 * clear (×) button that appears once there's text — so every search surface
 * (full search, ⌘K palette, Port, extensions) looks and behaves the same.
 */
const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      value,
      onValueChange,
      variant = 'input',
      hasSeparator = false,
      className,
      inputClassName,
      ...props
    },
    forwardedRef,
  ) => {
    const innerRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(
      forwardedRef,
      () => innerRef.current as HTMLInputElement,
    );

    const clear = () => {
      onValueChange('');
      innerRef.current?.focus();
    };

    return (
      <div
        className={cn(
          'relative flex w-full items-center',
          variant === 'command' &&
            hasSeparator &&
            cn('border-b', surfaceBorderColors),
          className,
        )}
        {...(variant === 'command' ? { 'cmdk-input-wrapper': '' } : {})}
      >
        <MagnifyingGlass
          className="pointer-events-none absolute left-3 z-10 size-4 shrink-0 text-neutral-500 dark:text-neutral-400"
          aria-hidden
        />
        {variant === 'command' ? (
          <CommandPrimitive.Input
            ref={innerRef}
            value={value}
            onValueChange={onValueChange}
            className={cn(
              'outline-hidden flex h-9 w-full rounded-lg border-0 bg-transparent py-1 pl-9 pr-9 text-base ring-0 placeholder:text-neutral-500 focus-visible:border-0 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:placeholder:text-neutral-400',
              inputClassName,
            )}
            {...props}
          />
        ) : (
          <Input
            ref={innerRef}
            value={value}
            onChange={event => onValueChange(event.target.value)}
            className={cn(
              'pl-9 pr-9 transition-shadow focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--accent-500)_45%,transparent)]',
              inputClassName,
            )}
            {...props}
          />
        )}
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={clear}
            className="[&_svg]:size-4! absolute right-1.5 size-7"
            aria-label="Clear search"
          >
            <X alt="Clear search" />
          </Button>
        )}
      </div>
    );
  },
);
SearchField.displayName = 'SearchField';

export { SearchField };
