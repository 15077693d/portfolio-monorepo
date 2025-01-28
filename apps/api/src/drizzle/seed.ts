import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import 'dotenv/config';
import { faker } from '@faker-js/faker';

const connectionString = process.env.DATABASE_URL as string;

const pool = new Pool({ connectionString, ssl: true });
const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

async function main() {
  const userIds = await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      const users = await db
        .insert(schema.users)
        .values({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        })
        .returning();
      return users?.[0]?.id;
    }),
  );
  const postIds = await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      const users = await db
        .insert(schema.posts)
        .values({
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraph(),
          authorId: faker.helpers.arrayElement(userIds as string[]),
        })
        .returning();
      return users?.[0]?.id;
    }),
  );
  await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      await db
        .insert(schema.comments)
        .values({
          content: faker.lorem.paragraph(),
          authorId: faker.helpers.arrayElement(userIds as string[]),
          postId: faker.helpers.arrayElement(postIds as string[]),
        })
        .returning();
    }),
  );
  const insertGroups = await db
    .insert(schema.groups)
    .values([
      {
        name: 'JS',
      },
      {
        name: 'TS',
      },
    ])
    .returning();
  const groupIds = insertGroups.map((group) => group.id);
  await Promise.all(
    userIds.map(async (userId) => {
      return await db
        .insert(schema.usersToGroups)
        .values({
          userId,
          groupId: faker.helpers.arrayElement(groupIds as string[]),
        })
        .returning();
    }),
  );
}

void main()
  .then(() => {
    console.log('Seed completed');
  })
  .catch((error) => {
    console.error(error);
    process.exit(0);
  });
