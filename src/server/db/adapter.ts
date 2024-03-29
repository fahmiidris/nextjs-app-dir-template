/**
 * @file Adapter for NextAuth.js to use PostgreSQL as a database.
 *
 * This file is a modified version of the adapter from the NextAuth.js repository.
 *
 * The original file can be found here:
 * @see https://github.com/nextauthjs/next-auth/blob/main/packages/adapter-drizzle/src/lib/pg.ts
 * @see https://authjs.dev/reference/adapter/drizzle
 *
 * Why is this file modified?
 * By default, NextAuth.js uses `camelCase` for its database rows while still following the conventional `snake_case` format for OAuth related values,
 * additionally, by default the table name is singular not plural (example: `user` not `users`). I don't like it, and that's a problem for me.
 * Most adapters can be used to force a casing convention. But, not for drizzle (at least for now).
 *
 * @see https://github.com/nextauthjs/next-auth/blob/c1a63680fb6a6cdfd6a4ade8c0b61cbe2aa9cd6f/packages/core/src/adapters.ts#L93
 */

import { and, eq, sql } from 'drizzle-orm';
import {
    timestamp,
    pgTable as defaultPgTableFn,
    text,
    primaryKey,
    integer,
    serial,
    varchar,
    index,
    type PgTableFn,
    type PgDatabase,
} from 'drizzle-orm/pg-core';

import type { Adapter, AdapterAccount } from 'next-auth/adapters';

type NonNullableProps<T> = {
    [P in keyof T]: null extends T[P] ? never : P;
}[keyof T];

function stripUndefined<T>(obj: T): Pick<T, NonNullableProps<T>> {
    const result = {} as T;

    for (const key in obj) if (obj[key] !== undefined) result[key] = obj[key];

    return result;
}

function createTables(pgTable: PgTableFn) {
    const users = pgTable(
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

    const accounts = pgTable(
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

    const sessions = pgTable(
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
            userIdIdx: index('session_user_id_idx').on(sessions.userId),
        })
    );

    const verificationTokens = pgTable(
        'verification_tokens',
        {
            id: serial('id'),
            identifier: varchar('identifier', { length: 255 }).notNull(),
            token: varchar('token', { length: 255 }).notNull(),
            expires: timestamp('expires', { mode: 'date' }).notNull(),
        },
        (vt) => ({
            compoundKey: primaryKey({ columns: [vt.id, vt.identifier, vt.token] }),
        })
    );

    return { users, accounts, sessions, verificationTokens };
}

export function PostgreSQLAdapter(client: InstanceType<typeof PgDatabase>, tableFn = defaultPgTableFn): Adapter {
    const { users, accounts, sessions, verificationTokens } = createTables(tableFn);

    return {
        async createUser(data) {
            return await client
                .insert(users)
                .values({ ...data, id: crypto.randomUUID() })
                .returning()
                .then((res) => res[0] ?? null);
        },

        async getUser(data) {
            return await client
                .select()
                .from(users)
                .where(eq(users.id, data))
                .then((res) => res[0] ?? null);
        },

        async getUserByEmail(data) {
            return await client
                .select()
                .from(users)
                .where(eq(users.email, data))
                .then((res) => res[0] ?? null);
        },

        async createSession(data) {
            return await client
                .insert(sessions)
                .values(data)
                .returning()
                .then((res) => res[0]);
        },

        async getSessionAndUser(data) {
            return await client
                .select({
                    session: sessions,
                    user: users,
                })
                .from(sessions)
                .where(eq(sessions.sessionToken, data))
                .innerJoin(users, eq(users.id, sessions.userId))
                .then((res) => res[0] ?? null);
        },

        async updateUser(data) {
            if (!data.id) {
                throw new Error('No user id.');
            }

            return await client
                .update(users)
                .set(data)
                .where(eq(users.id, data.id))
                .returning()
                .then((res) => res[0]);
        },

        async updateSession(data) {
            return await client
                .update(sessions)
                .set(data)
                .where(eq(sessions.sessionToken, data.sessionToken))
                .returning()
                .then((res) => res[0]);
        },

        async linkAccount(rawAccount) {
            const updatedAccount = await client
                .insert(accounts)
                .values(rawAccount)
                .returning()
                .then((res) => res[0]);

            const account = {
                ...updatedAccount,
                refresh_token_expires_in: updatedAccount.refreshTokenExpiresIn ?? undefined,
                refresh_token: updatedAccount.refreshToken ?? undefined,
                access_token: updatedAccount.accessToken ?? undefined,
                expires_at: updatedAccount.expiresAt ?? undefined,
                token_type: updatedAccount.tokenType ?? undefined,
                scope: updatedAccount.scope ?? undefined,
                id_token: updatedAccount.idToken ?? undefined,
                session_state: updatedAccount.sessionState ?? undefined,
            };

            return stripUndefined(account);
        },

        async getUserByAccount(account) {
            const dbAccount =
                (await client
                    .select()
                    .from(accounts)
                    .where(and(eq(accounts.providerAccountId, account.providerAccountId), eq(accounts.provider, account.provider)))
                    .leftJoin(users, eq(accounts.userId, users.id))
                    .then((res) => res[0])) ?? null;

            if (!dbAccount) {
                return null;
            }

            return dbAccount.users;
        },

        async deleteSession(sessionToken) {
            const session = await client
                .delete(sessions)
                .where(eq(sessions.sessionToken, sessionToken))
                .returning()
                .then((res) => res[0] ?? null);

            return session;
        },

        async createVerificationToken(token) {
            return await client
                .insert(verificationTokens)
                .values(token)
                .returning()
                .then((res) => res[0]);
        },

        async useVerificationToken(token) {
            try {
                return await client
                    .delete(verificationTokens)
                    .where(and(eq(verificationTokens.identifier, token.identifier), eq(verificationTokens.token, token.token)))
                    .returning()
                    .then((res) => res[0] ?? null);
            } catch (err) {
                throw new Error('No verification token found.');
            }
        },

        async deleteUser(id) {
            await client
                .delete(users)
                .where(eq(users.id, id))
                .returning()
                .then((res) => res[0] ?? null);
        },

        async unlinkAccount(account) {
            const { type, provider, providerAccountId, userId } = await client
                .delete(accounts)
                .where(and(eq(accounts.providerAccountId, account.providerAccountId), eq(accounts.provider, account.provider)))
                .returning()
                .then((res) => res[0] ?? null);

            return { provider, type, providerAccountId, userId };
        },
    };
}
