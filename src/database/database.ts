import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import migrations from "./migrations";
import { Exercise, ExerciseRoutine, Routine, SetEntry, SetScheme } from "./models";
import Workout from "./models/workouts";
import { schema } from "./schema";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: "until-failure-2.0",
  onSetUpError: (error) => {
    console.error(error);
  },
});

const database = new Database({
  adapter,
  modelClasses: [
    ExerciseRoutine,
    Exercise,
    Routine,
    Workout,
    SetEntry,
    SetScheme,
  ],
});

export default database;
