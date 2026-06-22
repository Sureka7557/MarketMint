import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const groceryItems = pgTable("grocery_items", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  quantity: integer("quantity").notNull().default(1),
  purchased: boolean("purchased").notNull().default(false),
  priority: text("priority").notNull().default("medium"),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// export const User = pgTable("grocery_items", {
//   id: text("id").primaryKey(),
//   name: text("name").notNull(),
//   category: text("category").notNull(),
//   quantity: integer("quantity").notNull().default(1),
//   purchased: boolean("purchased").notNull().default(false),
//   priority: text("priority").notNull().default("medium"),
//   updated_at: timestamp("updated_at").defaultNow().notNull(),
// });