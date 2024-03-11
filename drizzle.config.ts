import type { Config } from "drizzle-kit";

export default {
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  driver: "expo",
} satisfies Config;
