export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  isActive?: boolean;
}

export interface AIAgent {
  name: string;
  description: string;
  action: string;
  icon: string;
  color: string;
}

export interface LayoutState {
  isLeftSidebarOpen: boolean;
  isAgentsPanelOpen: boolean;
  activeRoute: string;
}

export type LayoutAction =
  | { type: "TOGGLE_LEFT_SIDEBAR" }
  | { type: "TOGGLE_AGENTS_PANEL" }
  | { type: "SET_ACTIVE_ROUTE"; payload: string }
  | { type: "SET_LEFT_SIDEBAR"; payload: boolean }
  | { type: "SET_AGENTS_PANEL"; payload: boolean };
