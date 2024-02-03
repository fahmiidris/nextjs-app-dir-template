import { sql, relations } from 'drizzle-orm';
import { primaryKey, timestamp, varchar } from 'drizzle-orm/pg-core';

import { pgTable } from '@/server/db/table';
import { accounts } from '@/server/db/schemas/accounts/schema';

export const users = pgTable(
    'users',
    {
        id: varchar('id', { length: 255 }).notNull(),
        name: varchar('name', { length: 255 }),
        email: varchar('email', { length: 255 }).notNull(),
        emailVerified: timestamp('email_verified', {
            mode: 'date',
        }).default(sql`CURRENT_TIMESTAMP`),
        image: varchar('image', { length: 255 }),
    },
    (users) => ({
        compoundKey: primaryKey({ columns: [users.id] }),
    })
);

export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
}));
