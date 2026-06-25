import { HTMLAttributes, ReactNode } from 'react';
import { ColorKey } from '../../../logic';
import {
  ResourceItem,
  ResourceSettings,
  ResourceUser,
} from '../../../logic/Models/types';
import { HeaderNode } from '../MenuBar/types';

export interface EntranceProps extends HTMLAttributes<HTMLDivElement> {
  themeColor: ColorKey;
}

export interface EntranceHeaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Document name shown in the start region. */
  fullname?: string;
  /** Richer start-region slot; overrides `fullname` when provided. */
  title?: ReactNode;
  /**
   * macOS-style menu-bar row rendered ABOVE the toolbar (App menu + File/Edit/
   * View). Declarative `HeaderNode[]` — typically from `useExtensionMenuBar`.
   * Omitted → no menu-bar row (single-row header).
   */
  menubar?: HeaderNode[];
  /**
   * Declarative, responsive menu region. When provided, renders a
   * `HeaderMenuBar` that collapses overflow into a "More" menu instead of
   * scrolling. Falls back to `children` when omitted (legacy).
   */
  menu?: HeaderNode[];
  /** End region — status indicators / primary actions (e.g. SaveStatus). */
  end?: ReactNode;
  /** Legacy escape hatch: rendered in the menu region only when `menu` is absent. */
  children?: ReactNode;
}

export interface PortalSystemPropsRequired {
  resourceItem: ResourceItem;
  resourceSettings: ResourceSettings;
  resourceUser: ResourceUser;
}

export interface PortalSystemProps extends PortalSystemPropsRequired {}
