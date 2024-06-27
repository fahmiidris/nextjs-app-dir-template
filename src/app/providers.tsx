'use client';

import * as React from 'react';

import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';

import ThemeWatcher from '@/app/_components/theme-watcher';
import TRPCReactProvider from '@/trpc/client/react';

import type { TProvidersProps } from '@/types/providers';

export default function Providers({ children }: TProvidersProps) {
    return (
        <TRPCReactProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                {children}

                <ThemeWatcher />
                <Toaster position="top-right" richColors />
            </ThemeProvider>
        </TRPCReactProvider>
    );
}
