import { relations } from 'drizzle-orm';

import { users } from '@/server/db/schemas/users/schema';
import { accounts } from '@/server/db/schemas/accounts/schema';

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, { fields: [accounts.user_id], references: [users.id] }),
}));
