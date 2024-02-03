import superjson from 'superjson';

import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import type { TAppRouter } from '@/server/routers';

export const transformer = superjson;

function getBaseUrl() {
    if (typeof window !== 'undefined') return '';
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    if (process.env.NEXT_PUBLIC_FE_URL) return process.env.NEXT_PUBLIC_FE_URL;

    return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getUrl() {
    return getBaseUrl() + '/api/trpc';
}

/**
 * Inference helper for inputs.
 *
 * @example type THelloInput = RouterInputs['example']['hello']
 */
export type TRouterInputs = inferRouterInputs<TAppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type THelloOutput = RouterOutputs['example']['hello']
 */
export type TRouterOutputs = inferRouterOutputs<TAppRouter>;
