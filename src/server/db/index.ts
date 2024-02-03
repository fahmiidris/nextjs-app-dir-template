import postgres from 'postgres';

import { drizzle } from 'drizzle-orm/postgres-js';

import * as schema from '@/server/db/schemas';

import { env } from '@/env.mjs';

export const db = drizzle(postgres(env.DATABASE_URL), {
    schema,
});
