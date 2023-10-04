import '@/styles/fonts.css';
import '@/styles/main.css';

import * as React from 'react';

import clsxm from '@/utils/clsxm';

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

export default function Layout({ children }: TLayoutProps) {
    return (
        <html lang="en" className={clsxm('scroll-smooth [--scroll-mt:9.875rem]', 'lg:[--scroll-mt:6.3125rem]')}>
            <body className="bg-white font-sans text-slate-500 antialiased">{children}</body>
        </html>
    );
}
