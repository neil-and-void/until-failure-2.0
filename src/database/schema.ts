import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const mySchema = appSchema({
  version: 1, // Increment this version whenever you make changes to your database schema
  tables: [
    tableSchema({
      name: "routines",
      columns: [
        { name: "id", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "active", type: "boolean" },
        { name: "private", type: "boolean" },
        { name: "user_id", type: "string", isIndexed: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
        { name: "deleted_at", type: "number", isOptional: true },
      ],
    }),
    tableSchema({
      name: "exercise_routines",
      columns: [
        { name: "id", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "active", type: "boolean" },
        { name: "routine_id", type: "string", isIndexed: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
        { name: "deleted_at", type: "number", isOptional: true },
      ],
    }),
    tableSchema({
      name: "set_schemes",
      columns: [
        { name: "id", type: "string", isIndexed: true },
        { name: "target_duration", type: "number" },
        { name: "target_reps", type: "number" },
        { name: "set_type", type: "string" },
        { name: "measurement", type: "string" },
        { name: "exercise_routine_id", type: "string", isIndexed: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
        { name: "deleted_at", type: "number", isOptional: true },
      ],
    }),
    tableSchema({
      name: "workouts",
      columns: [
        { name: "id", type: "string", isIndexed: true },
        { name: "start", type: "number" },
        { name: "end", type: "number", isOptional: true },
        { name: "routine_id", type: "string", isIndexed: true },
        { name: "user_id", type: "string", isIndexed: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
        { name: "deleted_at", type: "number", isOptional: true },
      ],
    }),
    tableSchema({
      name: "exercises",
      columns: [
        { name: "id", type: "string", isIndexed: true },
        { name: "notes", type: "string", isOptional: true },
        { name: "exercise_routine_id", type: "string", isIndexed: true },
        { name: "workout_id", type: "string", isIndexed: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
        { name: "deleted_at", type: "number", isOptional: true },
      ],
    }),
    tableSchema({
      name: "set_entries",
      columns: [
        { name: "id", type: "string", isIndexed: true },
        { name: "weight", type: "number", isOptional: true },
        { name: "reps", type: "number", isOptional: true },
        { name: "seconds", type: "number", isOptional: true },
        { name: "set_type", type: "string" },
        { name: "measurement", type: "string" },
        { name: "exercise_id", type: "string", isIndexed: true },
        { name: "set_scheme_id", type: "string", isIndexed: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
        { name: "deleted_at", type: "number", isOptional: true },
      ],
    }),
  ],
});
