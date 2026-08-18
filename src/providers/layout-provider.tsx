"use client";

/* ── LayoutProvider: manages left sidebar + AI agents panel open/close state ── */

import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { LayoutState, LayoutAction } from "@/types/layout.type";

const initialState: LayoutState = {
  isLeftSidebarOpen: true,
  isAgentsPanelOpen: true,
  activeRoute: "/",
};

function layoutReducer(state: LayoutState, action: LayoutAction): LayoutState {
  switch (action.type) {
    case "TOGGLE_LEFT_SIDEBAR":
      return { ...state, isLeftSidebarOpen: !state.isLeftSidebarOpen };
    case "TOGGLE_AGENTS_PANEL":
      return { ...state, isAgentsPanelOpen: !state.isAgentsPanelOpen };
    case "SET_ACTIVE_ROUTE":
      return { ...state, activeRoute: action.payload };
    case "SET_LEFT_SIDEBAR":
      return { ...state, isLeftSidebarOpen: action.payload };
    case "SET_AGENTS_PANEL":
      return { ...state, isAgentsPanelOpen: action.payload };
    default:
      return state;
  }
}

interface LayoutContextType {
  state: LayoutState;
  dispatch: React.Dispatch<LayoutAction>;
  toggleLeftSidebar: () => void;
  toggleAgentsPanel: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(layoutReducer, initialState);

  const toggleLeftSidebar = () => dispatch({ type: "TOGGLE_LEFT_SIDEBAR" });
  const toggleAgentsPanel = () => dispatch({ type: "TOGGLE_AGENTS_PANEL" });

  return (
    <LayoutContext.Provider
      value={{ state, dispatch, toggleLeftSidebar, toggleAgentsPanel }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}
