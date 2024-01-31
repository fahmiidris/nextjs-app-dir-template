import { env } from '@/env.mjs';

import type { Config } from 'drizzle-kit';

const drizzleConfig = {
    schema: './src/server/db/schema/*',
    out: './drizzle',
    driver: 'pg',
    dbCredentials: {
        connectionString: env.DATABASE_URL,
    },
    tablesFilter: [`${env.NEXT_PUBLIC_PREFIX}_*`],
    verbose: true,
    strict: true,
} satisfies Config;

export default drizzleConfig;
