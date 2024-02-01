import * as React from 'react';

import { api } from '@/trpc/server';

export default async function Page() {
    const ping = await api.quotes.get.query({
        from: 'Albert Einstein',
    });

    return (
        <main className="relative">
            <div className="container relative flex min-h-dvh flex-col items-center justify-center text-center">
                <p>
                    {`"${ping.quote}"`} - {ping.from}
                </p>
            </div>
        </main>
    );
}
