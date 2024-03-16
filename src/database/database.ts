import { drizzle } from "drizzle-orm/expo-sqlite";
import { deleteDatabaseSync, openDatabaseSync } from "expo-sqlite/next";
import * as schema from "./schema";

// deleteDatabaseSync("until-failure.db");
const expo = openDatabaseSync("until-failure.db");
const database = drizzle(expo, { schema });
export default database;
