import { index, timestamp, varchar } from 'drizzle-orm/pg-core';

import { pgTable } from '@/server/db/table';

export const sessions = pgTable(
    'session',
    {
        session_token: varchar('session_token', { length: 255 }).notNull().primaryKey(),
        user_id: varchar('user_id', { length: 255 }).notNull(),
        expires: timestamp('expires', { mode: 'date' }).notNull(),
    },
    (session) => ({
        user_id_idx: index('session_user_id_idx').on(session.user_id),
    })
);
