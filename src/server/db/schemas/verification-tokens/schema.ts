import { primaryKey, timestamp, varchar } from 'drizzle-orm/pg-core';

import { pgTable } from '@/server/db/table';

export const verificationTokens = pgTable(
    'verification_tokens',
    {
        identifier: varchar('identifier', { length: 255 }).notNull(),
        token: varchar('token', { length: 255 }).notNull(),
        expires: timestamp('expires', { mode: 'date' }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    })
);
