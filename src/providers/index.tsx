'use client';

/* ── Providers: central compositor — wraps all global context providers ── */

import { LayoutProvider } from './layout-provider';
import { ThemeProvider } from './theme-provider';
// import { AuthProvider } from './auth-provider'; // TODO: uncomment when src/api/auth/ is ready

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {/* <AuthProvider>{children}</AuthProvider> */}
        {children}
      </ThemeProvider>
    </LayoutProvider>
  );
}
