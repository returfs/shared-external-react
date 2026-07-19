import { ReactNode, useMemo, useState } from 'react';
import { AboutDialog, AboutManifest } from './AboutDialog';
import { HeaderMenuNode, HeaderNode } from './types';
import { useViewMode } from '../../../state/viewMode';

/** Standard menu slots returfs defines; the extension fills the items. */
export interface ExtensionMenuBarMenus {
  file?: HeaderNode[];
  edit?: HeaderNode[];
  view?: HeaderNode[];
  /** Additional top-level menus beyond the standard slots. */
  custom?: HeaderMenuNode[];
}

export interface UseExtensionMenuBarOptions {
  manifest: AboutManifest;
  menus?: ExtensionMenuBarMenus;
  /** Extra items appended to the returfs-owned App menu, after "About". */
  appItems?: HeaderNode[];
}

export interface UseExtensionMenuBarResult {
  /** Pass to `EntranceHeader`'s `menubar` prop (the macOS-style top row). */
  menubar: HeaderNode[];
  /** Render somewhere in the extension tree; opened by the App menu's "About". */
  aboutDialog: ReactNode;
}

/**
 * Builds the macOS-style menu-bar row for an extension and owns the About
 * dialog. returfs owns the **App menu** (labeled with the extension name, with a
 * standard "About" item) and the **Window menu** (Maximize / Full Screen); the
 * extension supplies the **File/Edit/View** items (and any custom top-level
 * menus). Reuses the declarative `HeaderNode` model, so the same `HeaderMenuBar`
 * renders it with nesting + overflow + disabled support.
 */
export function useExtensionMenuBar({
  manifest,
  menus,
  appItems,
}: UseExtensionMenuBarOptions): UseExtensionMenuBarResult {
  const [aboutOpen, setAboutOpen] = useState(false);
  const vm = useViewMode();

  const menubar = useMemo<HeaderNode[]>(() => {
    const nodes: HeaderNode[] = [];

    // App menu (returfs-owned), labeled with the extension's name.
    const appMenuItems: HeaderNode[] = [
      {
        type: 'action',
        id: 'about',
        label: `About ${manifest.displayName}`,
        onSelect: () => setAboutOpen(true),
      },
    ];
    if (appItems && appItems.length > 0) {
      appMenuItems.push(
        { type: 'separator', id: 'app-extra-sep' },
        ...appItems,
      );
    }
    nodes.push({
      type: 'menu',
      id: 'app',
      label: manifest.displayName,
      items: appMenuItems,
      emphasized: true,
    });

    // Standard menus (extension-provided), included only when non-empty.
    const standard: Array<[string, string, HeaderNode[] | undefined]> = [
      ['file', 'File', menus?.file],
      ['edit', 'Edit', menus?.edit],
      ['view', 'View', menus?.view],
    ];
    for (const [id, label, items] of standard) {
      if (items && items.length > 0) {
        nodes.push({ type: 'menu', id, label, items });
      }
    }

    // Window menu (returfs-owned), placed after View. returfs owns the
    // window/view controls (Maximize / Full Screen) here so every extension gets
    // them for free — they write the shared view-mode store.
    nodes.push({
      type: 'menu',
      id: 'window',
      label: 'Window',
      items: [
        {
          type: 'action',
          id: 'window-maximize',
          label: vm.isMaximized ? 'Exit Maximize' : 'Maximize',
          active: vm.isMaximized,
          onSelect: () => (vm.isMaximized ? vm.restore() : vm.maximize()),
        },
        {
          type: 'action',
          id: 'window-fullscreen',
          label: vm.isFullscreen ? 'Exit Full Screen' : 'Full Screen',
          active: vm.isFullscreen,
          onSelect: () => (vm.isFullscreen ? vm.maximize() : vm.fullscreen()),
        },
      ],
    });

    // Extra custom top-level menus.
    if (menus?.custom && menus.custom.length > 0) {
      nodes.push(...menus.custom);
    }

    return nodes;
  }, [manifest.displayName, menus, appItems, vm.isMaximized, vm.isFullscreen]);

  const aboutDialog = (
    <AboutDialog
      manifest={manifest}
      open={aboutOpen}
      onOpenChange={setAboutOpen}
    />
  );

  return { menubar, aboutDialog };
}
