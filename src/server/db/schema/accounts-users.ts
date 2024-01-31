import { relations } from 'drizzle-orm';

import { users } from '@/server/db/schema/users';
import { accounts } from '@/server/db/schema/accounts';

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, { fields: [accounts.user_id], references: [users.id] }),
}));
