import { sql } from 'drizzle-orm';
import { serial, timestamp, varchar } from 'drizzle-orm/pg-core';

import { pgTable } from '@/server/db/table';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }),
    email: varchar('email', { length: 255 }).notNull(),
    email_verified: timestamp('email_verified', {
        mode: 'date',
        precision: 3,
    }).default(sql`CURRENT_TIMESTAMP(3)`),
    image: varchar('image', { length: 255 }),
});
