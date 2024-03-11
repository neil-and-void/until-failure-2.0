import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const routines = sqliteTable("routines", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  active: integer("active", { mode: "boolean" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

export const exerciseRoutines = sqliteTable("exercise_routines", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  active: integer("active", { mode: "boolean" }).notNull(),
  routineId: integer("routine_id").references(() => routines.id),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

export const setSchemes = sqliteTable("set_schemes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  targetReps: integer("target_reps").notNull().default(0),
  targetDuration: integer("target_duration").notNull().default(0),
  setType: integer("set_type").notNull().default("WORKING"),
  measurement: integer("measurement").notNull().default("WEIGHT"),
  exerciseRoutineId: integer("exercise_routine_id").references(() => exerciseRoutines.id),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

export const workouts = sqliteTable("workouts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  start: integer("start", { mode: "timestamp" }).notNull(),
  end: integer("end", { mode: "timestamp" }),
  routineId: integer("routine_id").references(() => routines.id),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

export const exercises = sqliteTable("exercises", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  notes: text("notes"),
  routineId: integer("routine_id").references(() => routines.id),
  exerciseRoutineId: integer("exercise_routine_id").references(() => exerciseRoutines.id),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

export const setEntries = sqliteTable("set_entries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  weight: integer("weight"),
  reps: integer("reps"),
  seconds: integer("seconds"),
  setType: text("set_type").notNull().default("WORKING"),
  measurement: text("measurement").notNull().default("WORKING"),
  exerciseId: integer("exercise_id").references(() => exercises.id),
  setSchemeId: integer("set_scheme_id").references(() => setSchemes.id),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});
