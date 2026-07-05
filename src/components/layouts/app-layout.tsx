'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { LayoutProvider, useLayout } from '@/providers/layout-provider';
import { cn } from '@/lib/utils';
import { TopNavbar } from './top-navbar';

/* ── AppLayout: auth routes get no chrome, app routes get header + sidebar shells ── */

/** Routes that bypass the global layout. Supports exact match and '/auth/*' wildcard. */
const EXCLUDED_PATHS = ['/login', '/register', '/auth/*', '/forgot-password', '/reset-password'];

function isPathExcluded(pathname: string): boolean {
  return EXCLUDED_PATHS.some((pattern) => {
    if (pattern.endsWith('/*')) {
      return pathname.startsWith(pattern.slice(0, -2));
    }
    return pathname === pattern;
  });
}

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

/** Renders the app chrome (header, sidebar containers). Sidebars commented out — enable when ready. */
function LayoutInner({ children, title, subtitle }: AppLayoutProps) {
  const { state } = useLayout();

  return (
    <div className="min-h-screen bg-background">
      {/* Left Sidebar — uncomment when implementing
      <LeftSidebar /> */}

      {/* Main content area — shifts when sidebars open */}
      <div
        className={cn(
          'transition-all duration-300',
          state.isLeftSidebarOpen ? 'ml-64' : 'ml-0',
          state.isRightSidebarOpen ? 'mr-72' : 'mr-0'
        )}
      >
        <TopNavbar
          title={title || 'e-Crystal'}
          subtitle={subtitle || 'Premium crystals for every collection.'}
        />

        {children}
      </div>

      {/* Right Sidebar — uncomment when implementing
      <RightSidebar /> */}
    </div>
  );
}

/** Public API: auth pages get bare children, all others get full chrome. */
export function AppLayout({ children, ...props }: AppLayoutProps) {
  const pathname = usePathname();

  if (isPathExcluded(pathname)) {
    return <>{children}</>;
  }

  return (
    <LayoutProvider>
      <LayoutInner {...props}>{children}</LayoutInner>
    </LayoutProvider>
  );
}
