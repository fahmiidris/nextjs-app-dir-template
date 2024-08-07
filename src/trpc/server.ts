import 'server-only';

import * as React from 'react';

import { headers } from 'next/headers';

import { createTRPCContext } from '@/server/trpc';
import { createCaller } from '@/server/routers';

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = React.cache(() => {
    const heads = new Headers(headers());

    heads.set('x-trpc-source', 'rsc');

    return createTRPCContext({
        headers: heads,
    });
});

export const api = createCaller(createContext);
