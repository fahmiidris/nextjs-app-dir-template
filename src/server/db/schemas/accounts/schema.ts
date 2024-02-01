import { relations } from 'drizzle-orm';
import { index, integer, text, varchar, primaryKey, serial } from 'drizzle-orm/pg-core';

import { pgTable } from '@/server/db/table';
import { users } from '@/server/db/schemas/users/schema';

import type { AdapterAccount } from 'next-auth/adapters';

export const accounts = pgTable(
    'accounts',
    {
        id: serial('id'),
        userId: varchar('user_id', { length: 255 })
            .notNull()
            .references(() => users.id),
        type: varchar('type', { length: 255 }).$type<AdapterAccount['type']>().notNull(),
        provider: varchar('provider', { length: 255 }).notNull(),
        providerAccountId: varchar('provider_account_id', { length: 255 }).notNull(),
        refreshToken: text('refresh_token'),
        refreshTokenExpiresIn: integer('refresh_token_expires_in'),
        accessToken: text('access_token'),
        expiresAt: integer('expires_at'),
        tokenType: varchar('token_type', { length: 255 }),
        scope: varchar('scope', { length: 255 }),
        idToken: text('id_token'),
        sessionState: varchar('session_state', { length: 255 }),
    },
    (accounts) => ({
        compoundKey: primaryKey({
            columns: [accounts.id, accounts.provider, accounts.providerAccountId],
        }),
        userIdIdx: index('account_user_id_idx').on(accounts.userId),
    })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
    users: one(users, { fields: [accounts.userId], references: [users.id] }),
}));
