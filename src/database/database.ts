import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";

const expo = openDatabaseSync("until-failure-2.db");
const database = drizzle(expo);
export default database;
