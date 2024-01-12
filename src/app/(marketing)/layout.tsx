import * as React from 'react';

import type { TLayoutProps } from '@/types/layout.type';

export default async function Layout({ children }: TLayoutProps) {
    return <main className="relative">{children}</main>;
}
