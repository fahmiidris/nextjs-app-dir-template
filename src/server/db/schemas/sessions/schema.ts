import { relations } from 'drizzle-orm';
import { index, primaryKey, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

import { pgTable } from '@/server/db/table';
import { users } from '@/server/db/schemas/users/schema';

export const sessions = pgTable(
    'sessions',
    {
        id: serial('id'),
        sessionToken: varchar('session_token', { length: 255 }).notNull(),
        userId: varchar('user_id', { length: 255 })
            .notNull()
            .references(() => users.id),
        expires: timestamp('expires', { mode: 'date' }).notNull(),
    },
    (sessions) => ({
        compoundKey: primaryKey({ columns: [sessions.id, sessions.sessionToken] }),
        userIdIdx: index('session_userId_idx').on(sessions.userId),
    })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
    users: one(users, { fields: [sessions.userId], references: [users.id] }),
}));
