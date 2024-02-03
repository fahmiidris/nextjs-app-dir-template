import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
    /**
     * Specify your client-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars. To expose them to the client, prefix them with
     * `NEXT_PUBLIC_`.
     */
    client: {
        NEXT_PUBLIC_FE_URL: z.string().url(),
        NEXT_PUBLIC_BE_URL: z.string().url(),

        NEXT_PUBLIC_PREFIX: z.string(),
    },

    /**
     * Specify your server-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars.
     */
    server: {
        NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

        /**
         * This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
         * Since NextAuth.js automatically uses the VERCEL_URL if present.
         *
         * VERCEL_URL doesn't include `https` so it cant be validated as a URL
         */
        NEXTAUTH_URL: z.preprocess((str) => process.env.VERCEL_URL ?? str, process.env.VERCEL ? z.string() : z.string().url()),
        NEXTAUTH_SECRET: process.env.NODE_ENV === 'production' ? z.string() : z.string().optional(),

        GOOGLE_CLIENT_ID: z.string(),
        GOOGLE_CLIENT_SECRET: z.string(),

        // GITHUB_CLIENT_ID: z.string(),
        // GITHUB_CLIENT_SECRET: z.string(),

        // DB_HOST: z.string(),
        // DB_NAME: z.string(),
        // DB_PORT: z.string(),
        // DB_USER: z.string(),
        // DB_PASS: z.string(),

        DATABASE_URL: z.string(),
    },

    /**
     * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
     * middlewares) or client-side so we need to destruct manually.
     */
    runtimeEnv: {
        NEXT_PUBLIC_FE_URL: process.env.NEXT_PUBLIC_FE_URL,
        NEXT_PUBLIC_BE_URL: process.env.NEXT_PUBLIC_BE_URL,

        NEXT_PUBLIC_PREFIX: process.env.NEXT_PUBLIC_PREFIX,

        NODE_ENV: process.env.NODE_ENV,

        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

        // GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        // GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,

        // DB_HOST: process.env.DB_HOST,
        // DB_NAME: process.env.DB_NAME,
        // DB_PORT: process.env.DB_PORT,
        // DB_USER: process.env.DB_USER,
        // DB_PASS: process.env.DB_PASS,

        DATABASE_URL: process.env.DATABASE_URL,
    },

    /**
     * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
     * useful for Docker builds.
     */
    emptyStringAsUndefined: true,

    /**
     * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
     *
     * This is useful for making sure that you don't accidentally set a variable to an empty string.
     */
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
