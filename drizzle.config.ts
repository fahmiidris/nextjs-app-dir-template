import { env } from '@/env';

import { defineConfig } from 'drizzle-kit';

const config = defineConfig({
    schema: './src/server/db/schemas/**/schema.ts',
    out: './drizzle',
    driver: 'pg',
    dbCredentials: {
        connectionString: env.DATABASE_URL,
    },
    tablesFilter: [`${env.NEXT_PUBLIC_PREFIX}_*`],
    verbose: true,
    strict: true,
});

export default config;
