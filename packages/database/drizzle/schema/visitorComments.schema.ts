import { sql } from "drizzle-orm";
import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const visitorComments = pgTable("visitor_comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content").notNull(),
  timestamp: integer("timestamp")
    .notNull()
    .default(sql`extract(epoch from now())`),
  name: text("name").notNull(),
});

export type VisitorComment = typeof visitorComments.$inferSelect;
export type CreateVisitorComment = typeof visitorComments.$inferInsert;
