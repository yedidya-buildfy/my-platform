'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/lib/stores/theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    // Set initial theme based on system preference if not set
    if (!localStorage.getItem('bolt_theme')) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      useThemeStore.getState().setTheme(systemTheme);
    }

    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <>{children}</>;
} 