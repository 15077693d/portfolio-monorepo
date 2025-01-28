import { relations } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { posts } from './posts.schema';
import { comments } from './comments.schema';
import { profileInfo } from './profileInfo.schema';
import { usersToGroups } from './groups.schema';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  password: text('password').notNull(),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  posts: many(posts),
  comments: many(comments),
  profile: one(profileInfo),
  usersToGroups: many(usersToGroups),
}));
