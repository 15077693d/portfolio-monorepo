import { drizzle } from "drizzle-orm/node-postgres";

import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./drizzle/schema";
require("dotenv").config({ path: __dirname + "/./../../../.env" });
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL || "";
console.log(
  "🚀 ~ connectionString:",
  "new",
  __dirname + "/./../../../.env",
  connectionString
);
const pool = new Pool({ connectionString, ssl: true });
export const db = drizzle(pool, { schema });
export type DrizzleDB = NodePgDatabase<typeof schema>;
