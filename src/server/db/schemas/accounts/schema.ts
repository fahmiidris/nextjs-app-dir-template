import { primaryKey, index, integer, text, varchar } from 'drizzle-orm/pg-core';

import { pgTable } from '@/server/db/table';

import type { AdapterAccount } from 'next-auth/adapters';

export const accounts = pgTable(
    'accounts',
    {
        user_id: varchar('user_id', { length: 255 }).notNull(),
        type: varchar('type', { length: 255 }).$type<AdapterAccount['type']>().notNull(),
        provider: varchar('provider', { length: 255 }).notNull(),
        provider_account_id: varchar('provider_account_id', { length: 255 }).notNull(),
        refresh_token: text('refresh_token'),
        refresh_token_expires_in: integer('refresh_token_expires_in'),
        access_token: text('access_token'),
        expires_at: integer('expires_at'),
        token_type: varchar('token_type', { length: 255 }),
        scope: varchar('scope', { length: 255 }),
        id_token: text('id_token'),
        session_state: varchar('session_state', { length: 255 }),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.provider_account_id],
        }),
        user_id_idx: index('accounts_user_id_idx').on(account.user_id),
    })
);
