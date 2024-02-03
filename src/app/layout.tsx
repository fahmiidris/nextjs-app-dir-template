import '@/styles/fonts.css';
import '@/styles/main.css';

import * as React from 'react';

import { TRPCReactProvider } from '@/trpc/client/react';

import { cn } from '@/utils/cn';

import type { Metadata } from 'next';
import type { TLayoutProps } from '@/types/layout.type';

const DEFAULT_TITLE = 'Next.js App Dir Template';
const DEFAULT_DESCRIPTION = 'Next.js app directory template, built with Next.js (TypeScript) and Tailwind CSS.';

export const metadata: Metadata = {
    title: {
        template: `%s - ${DEFAULT_TITLE}`,
        default: DEFAULT_TITLE,
    },
    description: DEFAULT_DESCRIPTION,
};

export default async function Layout({ children }: TLayoutProps) {
    return (
        <html lang="en" className={cn(['scroll-smooth [--scroll-mt:9.875rem]', 'lg:[--scroll-mt:6.3125rem]'])}>
            <body className="bg-white font-sans text-slate-500 antialiased">
                <TRPCReactProvider>{children}</TRPCReactProvider>
            </body>
        </html>
    );
}
