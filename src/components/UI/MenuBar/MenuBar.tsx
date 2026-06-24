import { CaretDown, DotsThreeVertical } from '@phosphor-icons/react';
import { Fragment, ReactNode } from 'react';
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
            className={cn(
              node.active && 'font-medium',
              node.danger && 'text-red-500 focus:text-red-500',
            )}
          >
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
function renderTopLevel(node: HeaderNode, index: number): ReactNode {
  switch (node.type) {
    case 'separator':
      return (
        <Separator
          key={nodeKey(node, index)}
          orientation="vertical"
          className="h-6 shrink-0"
        />
      );
    case 'custom':
      return <Fragment key={node.id}>{node.render()}</Fragment>;
    case 'menu':
      return (
        <DropdownMenu key={node.id}>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={node.disabled}
              className="shrink-0 gap-1"
            >
              {node.icon}
              <span>{node.label}</span>
              <CaretDown className="opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {renderMenuItems(node.items)}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    case 'action': {
      const display = node.display ?? (node.pinned ? 'icon' : 'both');
      const showLabel = display !== 'icon';
      const showIcon = display !== 'label' && !!node.icon;
      const button = (
        <Button
          type="button"
          variant="outline"
          size={showLabel ? 'sm' : 'icon'}
          isActive={node.active}
          disabled={node.disabled}
          onClick={node.onSelect}
          aria-label={node.label}
          aria-pressed={node.active}
          className={cn(
            'shrink-0',
            showLabel && 'gap-1',
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
export function HeaderMenuBar({ items, className }: HeaderMenuBarProps) {
  const { containerRef, measureRef, moreRef, visibleCount } =
    useOverflowMenu(items.length);

  const visible = trimSeparators(items.slice(0, visibleCount));
  const overflow = items.slice(visibleCount);
  const hasOverflow = overflow.length > 0;

  const moreButton = (
    <Button
      type="button"
      variant="outline"
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
          'relative flex min-w-0 items-center gap-1 overflow-hidden lg:gap-2',
          className,
        )}
      >
        {/* Hidden measurement layer: all items at natural width, never shown. */}
        <div
          ref={measureRef}
          aria-hidden
          className="pointer-events-none invisible absolute left-0 top-0 flex w-max items-center gap-1 lg:gap-2"
        >
          {items.map(renderTopLevel)}
        </div>
        <div
          ref={moreRef}
          aria-hidden
          className="pointer-events-none invisible absolute left-0 top-0"
        >
          {moreButton}
        </div>

        {/* Visible row */}
        {visible.map(renderTopLevel)}
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
