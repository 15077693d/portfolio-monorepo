import { pgTable, uuid, text, jsonb } from 'drizzle-orm/pg-core';
import { users } from './users.schema';

export const profileInfo = pgTable('profileInfo', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  bio: text('bio'),
  metadata: jsonb('metadata').$type<{
    age: number;
    gender: string;
  }>(),
});
