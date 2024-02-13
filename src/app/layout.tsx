import '@/styles/fonts.css';
import '@/styles/main.css';

import * as React from 'react';

import Providers from '@/app/providers';

import { cn } from '@/utils/cn';

import type { Metadata } from 'next';

import type { TLayoutProps } from '@/types/layout';

export default async function Layout({ children }: TLayoutProps) {
    return (
        <html lang="en" className={cn(['scroll-smooth [--scroll-mt:9.875rem]', 'lg:[--scroll-mt:6.3125rem]'])} suppressHydrationWarning>
            <body className={cn(['bg-white font-sans text-slate-500 antialiased', 'dark:bg-zinc-700 dark:text-white'])}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}

const DEFAULT_TITLE = 'Next.js App Dir Template';
const DEFAULT_DESCRIPTION = 'Next.js app directory template, built with Next.js (TypeScript) and Tailwind CSS.';

export const metadata: Metadata = {
    title: {
        template: `%s - ${DEFAULT_TITLE}`,
        default: DEFAULT_TITLE,
    },
    description: DEFAULT_DESCRIPTION,
};
