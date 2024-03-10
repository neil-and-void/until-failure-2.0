import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { Platform } from "react-native";

import migrations from "./model/migrations";
import schema from "./model/schema";
// import Post from './model/Post'

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  // migrations,
  dbName: "until-failure-2.0",
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: Platform.OS === "ios",
  onSetUpError: (error) => {
    // Database failed to load -- offer the user to reload the app or log out
  },
});

const database = new Database({
  adapter,
  modelClasses: [
    // Post, // ⬅️ You'll add Models to Watermelon here
  ],
});

export default database;
