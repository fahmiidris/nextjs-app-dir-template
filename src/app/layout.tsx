import '@/styles/main.css';

import * as React from 'react';

import localFont from 'next/font/local';

import Providers from '@/app/providers';

import { cn } from '@/utils/classname';

import type { Metadata } from 'next';

import type { TLayoutProps } from '@/types/layout';

const fontSans = localFont({
    src: [
        {
            path: '../fonts/Inter-roman-latin.var.woff2',
            style: 'normal',
            weight: '100 900',
        },
        {
            path: '../fonts/Inter-italic-latin.var.woff2',
            style: 'italic',
            weight: '100 900',
        },
    ],
    display: 'swap',
    variable: '--font-sans',
});

export default async function Layout({ children }: TLayoutProps) {
    return (
        <html lang="en" className={cn(['scroll-smooth [--scroll-mt:9.875rem]', 'lg:[--scroll-mt:6.3125rem]'])} suppressHydrationWarning>
            <body className={cn([fontSans.variable, 'bg-white font-sans text-slate-500 antialiased', 'dark:bg-zinc-700 dark:text-white'])}>
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
