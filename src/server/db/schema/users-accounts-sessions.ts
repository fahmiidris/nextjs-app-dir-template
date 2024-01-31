import { relations } from 'drizzle-orm';

import { users } from '@/server/db/schema/users';
import { accounts } from '@/server/db/schema/accounts';
import { sessions } from '@/server/db/schema/sessions';

export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    sessions: many(sessions),
}));
