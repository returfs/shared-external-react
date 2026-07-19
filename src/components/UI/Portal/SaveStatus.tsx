import {
  CheckCircle,
  CircleNotch,
  CloudSlash,
  WarningCircle,
} from '@phosphor-icons/react';
import type { ComponentType } from 'react';
import { cn } from '../../../lib';

export type SaveState =
  | 'loading'
  | 'idle'
  | 'saving'
  | 'saved'
  | 'connecting'
  | 'offline'
  | 'error';

export interface SaveStatusProps {
  state: SaveState;
  /** Per-state label overrides (e.g. a collab editor's error: "Connection error"). */
  labels?: Partial<Record<SaveState, string>>;
  className?: string;
}

const STATUS_MAP: Record<
  SaveState,
  {
    label: string;
    Icon: ComponentType<{ className?: string }>;
    className: string;
    spin?: boolean;
  }
> = {
  loading: {
    label: 'Loading',
    Icon: CircleNotch,
    className: 'text-neutral-400',
    spin: true,
  },
  idle: {
    label: 'Saved',
    Icon: CheckCircle,
    className: 'text-neutral-400 dark:text-neutral-500',
  },
  saving: {
    label: 'Saving',
    Icon: CircleNotch,
    className: 'text-neutral-400',
    spin: true,
  },
  saved: {
    label: 'Saved',
    Icon: CheckCircle,
    className: 'text-green-500',
  },
  connecting: {
    label: 'Connecting',
    Icon: CircleNotch,
    className: 'text-neutral-400',
    spin: true,
  },
  offline: {
    label: 'Offline, changes will sync',
    Icon: CloudSlash,
    className: 'text-neutral-400',
  },
  error: {
    label: 'Save failed',
    Icon: WarningCircle,
    className: 'text-red-500',
  },
};

/**
 * Compact save/connection indicator for an extension header's `end` slot.
 * One component for every save model: REST autosave (loading/idle/saving/
 * saved/error) and collab sync (saving/saved/connecting/offline/error).
 * The label collapses to icon-only below `lg`.
 */
export function SaveStatus({ state, labels, className }: SaveStatusProps) {
  const {
    label: fallback,
    Icon,
    className: stateClassName,
    spin,
  } = STATUS_MAP[state];
  const label = labels?.[state] ?? fallback;

  return (
    <span
      className={cn(
        'flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-medium',
        stateClassName,
        className,
      )}
      title={label}
      aria-live="polite"
    >
      <Icon className={cn('size-4', spin && 'animate-spin')} />
      {/* max-lg:hidden, not `hidden lg:inline`: in the host app the shared
          stylesheet loads last, so its `hidden` would beat an app-side
          `lg:inline`. */}
      <span className="max-lg:hidden">{label}</span>
    </span>
  );
}
