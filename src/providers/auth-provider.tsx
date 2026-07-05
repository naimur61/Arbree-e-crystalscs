// ── AuthProvider (STUB): cookie-based auth — uncomment + create src/api/auth/ when backend is ready ──
//
// 'use client';
//
// import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
// import { useRouter } from 'next/navigation';
// import { authApi } from '@/api/auth/auth.api';
// import type { User, LoginRequest, RegisterRequest } from '@/api/auth/auth.types';
//
// // ═══════════════════════════════════════════════════════════
// // AUTH CONTEXT - COOKIE-BASED STRATEGY
// // ═══════════════════════════════════════════════════════════
//
// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   error: string | null;
//   login: (data: LoginRequest) => Promise<void>;
//   register: (data: RegisterRequest) => Promise<void>;
//   logout: () => Promise<void>;
//   clearError: () => void;
// }
//
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
//
// // ═══════════════════════════════════════════════════════════
// // AUTH PROVIDER
// // ═══════════════════════════════════════════════════════════
//
// export function AuthProvider({ children }: { children: ReactNode }) {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//
//   // Check if user is logged in on mount
//   useEffect(() => {
//     checkAuth();
//   }, []);
//
//   const checkAuth = async () => {
//     try {
//       setIsLoading(true);
//       // Cookie is auto-sent with the request
//       const userData = await authApi.getMe();
//       setUser(userData);
//     } catch (error) {
//       // User is not authenticated
//       setUser(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//   const login = useCallback(async (data: LoginRequest) => {
//     try {
//       setError(null);
//       setIsLoading(true);
//       // Server sets HttpOnly cookie via Set-Cookie header
//       const response = await authApi.login(data);
//       setUser(response.user);
//       router.push('/dashboard');
//     } catch (error: any) {
//       const message = error.response?.data?.message || 'Login failed';
//       setError(message);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   }, [router]);
//
//   const register = useCallback(async (data: RegisterRequest) => {
//     try {
//       setError(null);
//       setIsLoading(true);
//       const response = await authApi.register(data);
//       setUser(response.user);
//       router.push('/dashboard');
//     } catch (error: any) {
//       const message = error.response?.data?.message || 'Registration failed';
//       setError(message);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   }, [router]);
//
//   const logout = useCallback(async () => {
//     try {
//       await authApi.logout();
//     } catch (error) {
//       // Continue with logout even if API fails
//     } finally {
//       setUser(null);
//       router.push('/auth/login');
//     }
//   }, [router]);
//
//   const clearError = useCallback(() => {
//     setError(null);
//   }, []);
//
//   return (
//     <AuthContext.Provider value={{
//       user,
//       isAuthenticated: !!user,
//       isLoading,
//       error,
//       login,
//       register,
//       logout,
//       clearError,
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
//
// // ═══════════════════════════════════════════════════════════
// // USE AUTH HOOK
// // ═══════════════════════════════════════════════════════════
//
// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }
