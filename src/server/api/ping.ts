import { createTRPCRouter, publicProcedure } from '@/server/trpc';

export const ping = createTRPCRouter({
    get: publicProcedure.query(() => {
        return {
            message: 'This message comes from a server that uses tRPC!.',
        };
    }),
});
