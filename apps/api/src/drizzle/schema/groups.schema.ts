import { index, pgTable, primaryKey, text, uuid } from 'drizzle-orm/pg-core';
import { users } from './users.schema';

export const groups = pgTable('groups', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
});

export const usersToGroups = pgTable(
  'usersToGroups',
  {
    userId: uuid('user_id').references(() => users.id),
    groupId: uuid('group_id').references(() => groups.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.groupId] }),
    userIdIdx: index('user_id_idx').on(table.userId),
  }),
);
