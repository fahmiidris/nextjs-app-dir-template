import * as React from 'react';

import { unstable_noStore as noStore } from 'next/cache';

import Link from '@/components/link';
import Button from '@/components/ui/button';

import { api } from '@/trpc/server';
import { getServerAuthSession } from '@/server/auth';

export default async function Page() {
    noStore();

    const ping = await api.quotes.get({
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

                <div className="mt-8 flex items-center gap-4">
                    <Button type="button" asChild>
                        <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>{session ? 'Sign out' : 'Sign in'}</Link>
                    </Button>

                    <Button type="button" variant="secondary" asChild>
                        <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>{session ? 'Sign out' : 'Sign in'}</Link>
                    </Button>

                    <Button type="button" variant="outline" asChild>
                        <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>{session ? 'Sign out' : 'Sign in'}</Link>
                    </Button>

                    <Button type="button" variant="ghost" asChild>
                        <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>{session ? 'Sign out' : 'Sign in'}</Link>
                    </Button>

                    <Button type="button" variant="success" asChild>
                        <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>{session ? 'Sign out' : 'Sign in'}</Link>
                    </Button>

                    <Button type="button" variant="warning" asChild>
                        <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>{session ? 'Sign out' : 'Sign in'}</Link>
                    </Button>

                    <Button type="button" variant="info" asChild>
                        <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>{session ? 'Sign out' : 'Sign in'}</Link>
                    </Button>

                    <Button type="button" variant="danger" asChild>
                        <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>{session ? 'Sign out' : 'Sign in'}</Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
