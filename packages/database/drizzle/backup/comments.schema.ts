import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { posts } from './posts.schema';
import { users } from './users.schema';

export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content').notNull(),
  authorId: uuid('author_id').references(() => users.id),
  postId: uuid('post_id').references(() => posts.id),
});
