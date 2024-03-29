import { createCallerFactory, createTRPCRouter } from '@/server/trpc';

import { quotesRouter } from '@/server/routers/quotes/router';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    quotes: quotesRouter,
});

/**
 * Create a server-side caller for the tRPC API.
 *
 * @see https://trpc.io/docs/server/server-side-calls#basic-example
 */
export const createCaller = createCallerFactory(appRouter);

/**
 * This is the type of your router.
 *
 * This prevents us from importing server code on the client.
 */
export type TAppRouter = typeof appRouter;
