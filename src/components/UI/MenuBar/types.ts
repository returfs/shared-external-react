import { ReactNode } from 'react';

/**
 * Declarative header-menu model.
 *
 * Consumers (extensions) describe their header actions as DATA — a tree of
 * nodes — instead of hand-laying icon buttons. `HeaderMenuBar` renders the tree
 * and collapses whatever overflows the available width into a trailing "More"
 * dropdown (see `useOverflowMenu`), so the bar never scrolls horizontally and
 * scales as actions grow.
 *
 * A `menu` node nests arbitrarily (menu → menu → action), giving sub- and
 * sub-sub-menus for free via the Radix `DropdownMenuSub*` primitives.
 */
export type HeaderNode =
  | HeaderActionNode
  | HeaderMenuNode
  | HeaderSeparatorNode
  | HeaderCustomNode;

/** A single clickable command. */
export interface HeaderActionNode {
  type: 'action';
  id: string;
  label: string;
  icon?: ReactNode;
  /** Keyboard hint shown in the overflow menu (e.g. "⌘B"). */
  shortcut?: string;
  onSelect: () => void;
  disabled?: boolean;
  /** Toggle/pressed state (bold on, etc.). */
  active?: boolean;
  /** Render with destructive styling. */
  danger?: boolean;
  /**
   * Hybrid hint: prefer to keep this visible as a compact icon button. Declared
   * order still drives collapse (right-to-left), so declare pinned actions first
   * to have them survive longest. Defaults the top-level display to icon-only.
   */
  pinned?: boolean;
  /** Force how the node looks at the top level. Defaults: pinned → 'icon', else 'both'. */
  display?: 'icon' | 'label' | 'both';
}

/** A dropdown grouping nested nodes; nests for sub-/sub-sub-menus. */
export interface HeaderMenuNode {
  type: 'menu';
  id: string;
  label: string;
  icon?: ReactNode;
  items: HeaderNode[];
  disabled?: boolean;
  /**
   * Render the trigger as an emphasized, chrome-less label (bold, underline on
   * hover) rather than a button — used for the macOS App menu (extension name)
   * in `menubar` appearance.
   */
  emphasized?: boolean;
}

/** A visual divider between groups. */
export interface HeaderSeparatorNode {
  type: 'separator';
  id?: string;
}

/**
 * Escape hatch for stateful controls that don't fit the action/menu model
 * (color pickers, font selectors, link popovers). `render` draws it at the top
 * level; `renderCollapsed` is an optional menu-friendly form used when the node
 * is pushed into the overflow dropdown (falls back to `render`).
 */
export interface HeaderCustomNode {
  type: 'custom';
  id: string;
  render: () => ReactNode;
  renderCollapsed?: () => ReactNode;
}

export interface HeaderMenuBarProps {
  items: HeaderNode[];
  className?: string;
  /**
   * Visual style of the top-level triggers:
   * - `toolbar` (default): bordered `outline` buttons + dropdown carets.
   * - `menubar`: flat, borderless macOS-style menu labels (no carets).
   */
  appearance?: 'toolbar' | 'menubar';
}

export function nodeKey(node: HeaderNode, index: number): string {
  return node.type === 'separator' ? (node.id ?? `sep-${index}`) : node.id;
}
