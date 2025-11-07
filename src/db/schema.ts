import {
  sqliteTable,
  text,
  integer,
  SQLiteColumn,
} from "drizzle-orm/sqlite-core";
import { User } from "@/types";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fullName: text("full_name").notNull(),
  age: integer("age").notNull(),
  country: text("country").notNull(),
  interests: text("interests").notNull(),
}) satisfies Record<keyof User, SQLiteColumn>;
