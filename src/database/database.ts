import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
import * as schema from "./schema";

const expo = openDatabaseSync("until-failure.db");
const database = drizzle(expo, { schema });
export default database;
