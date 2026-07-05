'use client';

/* ── LayoutProvider: manages left/right sidebar open/close state (ready for future sidebars) ── */

import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { LayoutState, LayoutAction } from '@/types/layout.type';

const initialState: LayoutState = {
  isLeftSidebarOpen: true,
  isRightSidebarOpen: true,
  activeRoute: '/',
};

function layoutReducer(state: LayoutState, action: LayoutAction): LayoutState {
  switch (action.type) {
    case 'TOGGLE_LEFT_SIDEBAR':
      return { ...state, isLeftSidebarOpen: !state.isLeftSidebarOpen };
    case 'TOGGLE_RIGHT_SIDEBAR':
      return { ...state, isRightSidebarOpen: !state.isRightSidebarOpen };
    case 'SET_ACTIVE_ROUTE':
      return { ...state, activeRoute: action.payload };
    case 'SET_LEFT_SIDEBAR':
      return { ...state, isLeftSidebarOpen: action.payload };
    case 'SET_RIGHT_SIDEBAR':
      return { ...state, isRightSidebarOpen: action.payload };
    default:
      return state;
  }
}

interface LayoutContextType {
  state: LayoutState;
  dispatch: React.Dispatch<LayoutAction>;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(layoutReducer, initialState);

  const toggleLeftSidebar = () => dispatch({ type: 'TOGGLE_LEFT_SIDEBAR' });
  const toggleRightSidebar = () => dispatch({ type: 'TOGGLE_RIGHT_SIDEBAR' });

  return (
    <LayoutContext.Provider value={{ state, dispatch, toggleLeftSidebar, toggleRightSidebar }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}
