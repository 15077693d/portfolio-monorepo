import { faker } from "@faker-js/faker";
import * as schema from "./schema";
import { db } from "../database";

async function main() {
  //clear all table

  await db.delete(schema.visitorComments).execute();
  // await db.delete(schema.usersToGroups).execute();
  // await db.delete(schema.groups).execute();
  // await db.delete(schema.comments).execute();
  // await db.delete(schema.posts).execute();
  // await db.delete(schema.users).execute();

  await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      await db
        .insert(schema.visitorComments)
        .values({
          content: faker.lorem.paragraph(),
          name: faker.person.fullName(),
        })
        .returning();
    })
  );
  // const userIds = await Promise.all(
  //   Array.from({ length: 10 }).map(async () => {
  //     const users = await db
  //       .insert(schema.users)
  //       .values({
  //         name: faker.person.fullName(),
  //         email: faker.internet.email(),
  //         password: faker.internet.password(),
  //       })
  //       .returning();
  //     return users?.[0]?.id;
  //   }),
  // );
  // const postIds = await Promise.all(
  //   Array.from({ length: 10 }).map(async () => {
  //     const users = await db
  //       .insert(schema.posts)
  //       .values({
  //         title: faker.lorem.sentence(),
  //         content: faker.lorem.paragraph(),
  //         authorId: faker.helpers.arrayElement(userIds),
  //       })
  //       .returning();
  //     return users?.[0]?.id;
  //   }),
  // );
  // await Promise.all(
  //   Array.from({ length: 10 }).map(async () => {
  //     await db
  //       .insert(schema.comments)
  //       .values({
  //         content: faker.lorem.paragraph(),
  //         authorId: faker.helpers.arrayElement(userIds),
  //         postId: faker.helpers.arrayElement(postIds),
  //       })
  //       .returning();
  //   }),
  // );
  // const insertGroups = await db
  //   .insert(schema.groups)
  //   .values([
  //     {
  //       name: 'JS',
  //     },
  //     {
  //       name: 'TS',
  //     },
  //   ])
  //   .returning();
  // const groupIds = insertGroups.map((group) => group.id);
  // await Promise.all(
  //   userIds.map(async (userId) => {
  //     return await db
  //       .insert(schema.usersToGroups)
  //       .values({
  //         userId,
  //         groupId: faker.helpers.arrayElement(groupIds as string[]),
  //       })
  //       .returning();
  //   }),
  // );
}

void main()
  .then(() => {
    console.log("Seed completed");
  })
  .catch((error) => {
    console.error(error);
    process.exit(0);
  });
