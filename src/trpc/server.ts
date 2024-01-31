import 'server-only';

import { cache } from 'react';
import { headers } from 'next/headers';
import { observable } from '@trpc/server/observable';
import { callTRPCProcedure } from '@trpc/server';
import { createTRPCClient, loggerLink, TRPCClientError } from '@trpc/client';

import { transformer } from '@/trpc/shared';
import { createTRPCContext } from '@/server/trpc';
import { appRouter, type TAppRouter } from '@/server/router';

import { env } from '@/env.mjs';

import type { TRPCErrorResponse } from '@trpc/server/rpc';

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
    const heads = new Headers(headers());

    heads.set('x-trpc-source', 'rsc');

    return createTRPCContext({
        headers: heads,
    });
});

export const api = createTRPCClient<TAppRouter>({
    transformer,
    links: [
        loggerLink({
            enabled: (op) => env.NODE_ENV === 'development' || (op.direction === 'down' && op.result instanceof Error),
        }),

        /**
         * Custom RSC link that lets us invoke procedures without using http requests. Since Server
         * Components always run on the server, we can just call the procedure as a function.
         */
        () => {
            return ({ op }) => {
                return observable((observer) => {
                    createContext()
                        .then((ctx) => {
                            return callTRPCProcedure({
                                procedures: appRouter._def.procedures,
                                path: op.path,
                                getRawInput: async () => await op.input,
                                ctx,
                                type: op.type,
                            });
                        })
                        .then((data) => {
                            observer.next({ result: { data } });
                            observer.complete();
                        })
                        .catch((cause: TRPCErrorResponse) => {
                            observer.error(TRPCClientError.from(cause));
                        });
                });
            };
        },
    ],
});
