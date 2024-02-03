import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

const env = createEnv({
    client: {
        NEXT_PUBLIC_FE_URL: z.string().url(),
        NEXT_PUBLIC_BE_URL: z.string().url(),
    },
    server: {},
    runtimeEnv: {
        NEXT_PUBLIC_FE_URL: process.env.NEXT_PUBLIC_FE_URL,
        NEXT_PUBLIC_BE_URL: process.env.NEXT_PUBLIC_BE_URL,
    },
});

export default env;
