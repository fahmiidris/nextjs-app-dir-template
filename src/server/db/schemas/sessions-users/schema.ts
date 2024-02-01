import { relations } from 'drizzle-orm';

import { users } from '@/server/db/schemas/users/schema';
import { sessions } from '@/server/db/schemas/sessions/schema';

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, { fields: [sessions.user_id], references: [users.id] }),
}));
