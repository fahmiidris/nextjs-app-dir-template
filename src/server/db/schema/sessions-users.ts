import { relations } from 'drizzle-orm';

import { users } from '@/server/db/schema/users';
import { sessions } from '@/server/db/schema/sessions';

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, { fields: [sessions.user_id], references: [users.id] }),
}));
