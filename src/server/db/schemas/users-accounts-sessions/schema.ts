import { relations } from 'drizzle-orm';

import { users } from '@/server/db/schemas/users/schema';
import { accounts } from '@/server/db/schemas/accounts/schema';
import { sessions } from '@/server/db/schemas/sessions/schema';

export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    sessions: many(sessions),
}));
