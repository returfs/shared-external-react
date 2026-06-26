import { CaretDown, Check, DotsThreeVertical } from '@phosphor-icons/react';
import { Fragment, ReactNode, useState } from 'react';

type Appearance = 'toolbar' | 'menubar';

/**
 * Coordinates open state across sibling menus so the bar behaves like a real
 * menu bar: only one menu open at a time, and hovering another menu while one is
 * already open switches to it. `onCloseAutoFocus` is also suppressed so clicking
 * away (e.g. into an editor) doesn't yank focus back to the trigger.
 */
interface MenuControl {
  openId: string | null;
  setOpenId: (updater: (prev: string | null) => string | null) => void;
}
import { cn } from '../../../lib';
import { Button } from '../Buttons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../DropdownMenu';
import { Separator } from '../Separation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../Tooltip';
import { HeaderMenuBarProps, HeaderNode, nodeKey } from './types';
import { useOverflowMenu } from './useOverflowMenu';

/** Drop leading/trailing and collapse consecutive separators (cosmetic). */
function trimSeparators(nodes: HeaderNode[]): HeaderNode[] {
  const out: HeaderNode[] = [];
  for (const node of nodes) {
    if (node.type === 'separator') {
      if (out.length === 0) continue;
      if (out[out.length - 1].type === 'separator') continue;
    }
    out.push(node);
  }
  while (out.length && out[out.length - 1].type === 'separator') out.pop();
  return out;
}

/** Render nodes as dropdown menu items (used for overflow + nested submenus). */
function renderMenuItems(nodes: HeaderNode[]): ReactNode {
  return trimSeparators(nodes).map((node, index) => {
    switch (node.type) {
      case 'separator':
        return <DropdownMenuSeparator key={nodeKey(node, index)} />;
      case 'action':
        return (
          <DropdownMenuItem
            key={node.id}
            disabled={node.disabled}
            onSelect={() => node.onSelect()}
            className={cn(node.danger && 'text-red-500 focus:text-red-500')}
          >
            {/* Check shown inline only when toggled on — no reserved gutter, so
                non-toggle items (About, Export…) start flush at the left. */}
            {node.active && <Check className="size-4 shrink-0" />}
            {node.icon}
            <span>{node.label}</span>
            {node.shortcut && (
              <DropdownMenuShortcut>{node.shortcut}</DropdownMenuShortcut>
            )}
          </DropdownMenuItem>
        );
      case 'menu':
        return (
          <DropdownMenuSub key={node.id}>
            <DropdownMenuSubTrigger disabled={node.disabled}>
              {node.icon}
              <span>{node.label}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {renderMenuItems(node.items)}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        );
      case 'custom':
        return (
          <div key={node.id} className="px-1 py-0.5">
            {node.renderCollapsed?.() ?? node.render()}
          </div>
        );
    }
  });
}

/** Render a single node in its top-level (visible) form. */
function renderTopLevel(
  node: HeaderNode,
  index: number,
  appearance: Appearance,
  menuControl?: MenuControl,
): ReactNode {
  const isMenubar = appearance === 'menubar';
  switch (node.type) {
    case 'separator':
      return (
        <Separator
          key={nodeKey(node, index)}
          orientation="vertical"
          className="mx-1 h-5 shrink-0"
        />
      );
    case 'custom':
      return <Fragment key={node.id}>{node.render()}</Fragment>;
    case 'menu': {
      // The App menu (emphasized, menubar only) reads as a bold text label that
      // underlines on hover — not a button — and sits flush-left (px-0) so it
      // aligns with the filename below it.
      const emphasized = isMenubar && node.emphasized;
      // When coordinated, drive open state from the shared controller so only
      // one menu is open at a time and hovering switches between them.
      const controlled = !!menuControl;
      const dropdownProps = controlled
        ? {
            open: menuControl.openId === node.id,
            onOpenChange: (o: boolean) =>
              menuControl.setOpenId(prev =>
                o ? node.id : prev === node.id ? null : prev,
              ),
          }
        : {};
      return (
        <DropdownMenu key={node.id} {...dropdownProps}>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant={emphasized ? 'link' : isMenubar ? 'ghost' : 'outline'}
              size="sm"
              disabled={node.disabled}
              // macOS-style: once a menu is open, hovering a sibling switches.
              onPointerEnter={
                controlled && !node.disabled
                  ? () =>
                      menuControl.setOpenId(prev =>
                        prev !== null && prev !== node.id ? node.id : prev,
                      )
                  : undefined
              }
              className={cn(
                // h-7 in the 42px row leaves a clean ~7px inset top/bottom,
                // matching the toolbar controls below.
                'h-7 shrink-0',
                // App label: chrome-less bold text, flush-left (px-0) to align
                // with the filename below, plus right margin so the first real
                // menu (File) isn't cramped against it.
                emphasized && 'mr-3 px-0 font-bold',
                isMenubar && !emphasized && 'font-normal',
                !isMenubar && 'gap-1',
              )}
            >
              {node.icon}
              <span>{node.label}</span>
              {!isMenubar && <CaretDown className="opacity-60" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            // Don't pull focus back to the trigger on close — lets a click into
            // the editor keep focus there (so the next keypress goes to text,
            // not re-opening the menu).
            onCloseAutoFocus={
              controlled ? e => e.preventDefault() : undefined
            }
          >
            {renderMenuItems(node.items)}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    case 'action': {
      const display = node.display ?? (node.pinned ? 'icon' : 'both');
      const showLabel = display !== 'icon';
      const showIcon = display !== 'label' && !!node.icon;
      const button = (
        <Button
          type="button"
          variant={isMenubar ? 'ghost' : 'outline'}
          size={showLabel ? 'sm' : 'icon'}
          isActive={node.active}
          disabled={node.disabled}
          onClick={node.onSelect}
          aria-label={node.label}
          aria-pressed={node.active}
          className={cn(
            // h-7 matches the icon-button height (size-7) so every toolbar /
            // menu-bar control is the same height, inset from the 42px row.
            'h-7 shrink-0',
            showLabel && 'gap-1',
            isMenubar && showLabel && 'font-normal',
            node.danger && 'text-red-500',
          )}
        >
          {showIcon && node.icon}
          {showLabel && <span>{node.label}</span>}
        </Button>
      );
      // A visible label is self-describing; only icon-only buttons need a tooltip.
      if (showLabel) return <Fragment key={node.id}>{button}</Fragment>;
      return (
        <Tooltip key={node.id}>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>
            {node.label}
            {node.shortcut ? ` (${node.shortcut})` : ''}
          </TooltipContent>
        </Tooltip>
      );
    }
  }
}

/**
 * Declarative, responsive header menu bar.
 *
 * Renders `items` left-to-right; whatever doesn't fit the available width
 * collapses (right-to-left) into a trailing "More" dropdown. On a very narrow
 * container everything collapses into a single kebab. See `useOverflowMenu`.
 */
export function HeaderMenuBar({
  items,
  className,
  appearance = 'toolbar',
}: HeaderMenuBarProps) {
  const { containerRef, measureRef, moreRef, visibleCount } = useOverflowMenu(
    items.length,
  );

  // Shared open state so sibling menus behave like one menu bar (one open at a
  // time + hover-to-switch). See MenuControl.
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuControl: MenuControl = { openId: openMenuId, setOpenId: setOpenMenuId };

  const visible = trimSeparators(items.slice(0, visibleCount));
  const overflow = items.slice(visibleCount);
  const hasOverflow = overflow.length > 0;
  const renderTop = (node: HeaderNode, index: number) =>
    renderTopLevel(node, index, appearance, menuControl);
  // Measurement copies must stay uncontrolled, or an open menu would also open
  // a duplicate (invisible) portal from the hidden layer.
  const renderMeasure = (node: HeaderNode, index: number) =>
    renderTopLevel(node, index, appearance);

  const moreButton = (
    <Button
      type="button"
      variant={appearance === 'menubar' ? 'ghost' : 'outline'}
      size="icon"
      aria-label="More actions"
      className="shrink-0"
    >
      <DotsThreeVertical />
    </Button>
  );

  return (
    <TooltipProvider>
      <div
        ref={containerRef}
        className={cn(
          'relative flex min-w-0 items-center gap-0.5 overflow-hidden lg:gap-1',
          className,
        )}
      >
        {/* Hidden measurement layer: all items at natural width, never shown. */}
        <div
          ref={measureRef}
          aria-hidden
          className="pointer-events-none invisible absolute left-0 top-0 flex w-max items-center gap-0.5 lg:gap-1"
        >
          {items.map(renderMeasure)}
        </div>
        <div
          ref={moreRef}
          aria-hidden
          className="pointer-events-none invisible absolute left-0 top-0"
        >
          {moreButton}
        </div>

        {/* Visible row */}
        {visible.map(renderTop)}
        {hasOverflow && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>{moreButton}</DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {renderMenuItems(overflow)}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </TooltipProvider>
  );
}
