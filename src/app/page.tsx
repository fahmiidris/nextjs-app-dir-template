import * as React from 'react';

import { api } from '@/trpc/server';

export default async function Page() {
    const ping = await api.ping.get.query();

    return (
        <main className="relative">
            <div className="container relative flex min-h-dvh flex-col items-center justify-center text-center">
                <p>{ping.message}</p>
                <p>Insanity is doing the same thing over and over again and expecting different results.</p>
            </div>
        </main>
    );
}
