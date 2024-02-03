import * as React from 'react';

import NextLink from 'next/link';

import { unstable_noStore as noStore } from 'next/cache';

import { api } from '@/trpc/server';
import { getServerAuthSession } from '@/server/auth';

export default async function Page() {
    noStore();

    const ping = await api.quotes.get.query({
        from: 'Albert Einstein',
    });

    const session = await getServerAuthSession();

    return (
        <main className="relative">
            <div className="container relative flex min-h-dvh flex-col items-center justify-center text-center">
                <p className="font-medium">
                    {`"${ping.quote}"`} - {ping.from}
                </p>

                {session ? (
                    <p className="font-medium">
                        You are logged in as {session.user.name} ({session.user.email})
                    </p>
                ) : null}

                <div className="mt-8">
                    <NextLink
                        href={session ? '/api/auth/signout' : '/api/auth/signin'}
                        className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
                    >
                        {session ? 'Sign out' : 'Sign in'}
                    </NextLink>
                </div>
            </div>
        </main>
    );
}
