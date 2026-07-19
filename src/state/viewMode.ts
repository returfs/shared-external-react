import { useSyncExternalStore } from 'react';

export type ViewMode = 'normal' | 'maximized' | 'fullscreen';

let currentMode: ViewMode = 'normal';
const listeners = new Set<() => void>();

/**
 * Shared view-mode state governing how much shell surrounds the active
 * extension: `normal` (host sidebar/tabs visible), `maximized` (extension + its
 * own header fill the viewport), `fullscreen` (even the extension header is
 * hidden — content only).
 *
 * Lives in shared-external-react on purpose: it's the ONE store both the host
 * and the federated extension can read/write, since shared-external-react is the
 * host singleton. The host reads it to hide its shell; the extension header
 * (EntranceHeader) reads it to hide itself in fullscreen; the App-menu controls
 * write it.
 */
export const viewModeStore = {
  getMode: (): ViewMode => currentMode,
  setMode: (mode: ViewMode): void => {
    if (mode === currentMode) return;
    currentMode = mode;
    for (const listener of listeners) listener();
  },
  subscribe: (listener: () => void): (() => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export const viewModeActions = {
  setMode: (mode: ViewMode) => viewModeStore.setMode(mode),
  maximize: () => viewModeStore.setMode('maximized'),
  fullscreen: () => viewModeStore.setMode('fullscreen'),
  restore: () => viewModeStore.setMode('normal'),
};

/** Subscribe to the shared view-mode (SSR snapshot is always `normal`). */
export function useViewMode() {
  const mode = useSyncExternalStore(
    viewModeStore.subscribe,
    viewModeStore.getMode,
    () => 'normal' as ViewMode,
  );

  return {
    mode,
    isNormal: mode === 'normal',
    isMaximized: mode === 'maximized',
    isFullscreen: mode === 'fullscreen',
    ...viewModeActions,
  };
}
