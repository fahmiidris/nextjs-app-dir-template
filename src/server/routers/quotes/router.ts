import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/trpc';

export const quotesRouter = createTRPCRouter({
    get: publicProcedure.input(z.object({ from: z.string() })).query(({ input }) => {
        return {
            quote: 'Insanity is doing the same thing over and over again and expecting different results.',
            from: input.from,
        };
    }),
});
