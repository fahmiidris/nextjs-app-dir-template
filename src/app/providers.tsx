'use client';

import * as React from 'react';

import { ThemeProvider } from 'next-themes';

import { ThemeWatcher } from '@/app/_components/theme-watcher';
import { TRPCReactProvider } from '@/trpc/client/react';

type TProvidersProps = React.PropsWithChildren;

export default function Providers({ children }: TProvidersProps) {
    return (
        <TRPCReactProvider>
            <ThemeProvider attribute="class" disableTransitionOnChange>
                {children}

                <ThemeWatcher />
            </ThemeProvider>
        </TRPCReactProvider>
    );
}
