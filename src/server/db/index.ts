import postgres from 'postgres';

import { drizzle } from 'drizzle-orm/postgres-js';

import * as schema from '@/server/db/schema';

import { env } from '@/env.mjs';

export const db = drizzle(postgres(env.DATABASE_URL, { prepare: false }), {
    schema,
});
