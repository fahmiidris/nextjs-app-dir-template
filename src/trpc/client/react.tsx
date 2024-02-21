'use client';

import * as React from 'react';

import { createTRPCReact } from '@trpc/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client';

import { getUrl, transformer } from '@/trpc/shared';

import type { TAppRouter } from '@/server/routers';

export const api = createTRPCReact<TAppRouter>();

export function TRPCReactProvider(props: { children: React.ReactNode }) {
    const [queryClient] = React.useState(() => new QueryClient());

    const [trpcClient] = React.useState(() => {
        return api.createClient({
            transformer,
            links: [
                loggerLink({
                    enabled: (op) => process.env.NODE_ENV === 'development' || (op.direction === 'down' && op.result instanceof Error),
                }),
                unstable_httpBatchStreamLink({
                    url: getUrl(),
                    headers: async () => {
                        const headers = new Headers();

                        headers.set('x-trpc-source', 'nextjs');

                        return headers;
                    },
                }),
            ],
        });
    });

    return (
        <QueryClientProvider client={queryClient}>
            <api.Provider client={trpcClient} queryClient={queryClient}>
                {props.children}
            </api.Provider>

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
