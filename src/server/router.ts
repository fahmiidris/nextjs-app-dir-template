import { createTRPCRouter } from '@/server/trpc';

import { ping } from '@/server/api/ping';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    ping,
});

/**
 * This is the type of your router.
 *
 * This prevents us from importing server code on the client.
 */
export type TAppRouter = typeof appRouter;
