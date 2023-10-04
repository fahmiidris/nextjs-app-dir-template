import * as React from 'react';

import type { TLayoutProps } from '@/types/layout.type';

export default function Layout({ children }: TLayoutProps) {
    return <main className="relative">{children}</main>;
}
