import { relations } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const routines = sqliteTable("routines", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  active: integer("active", { mode: "boolean" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});
export const routinesRelations = relations(routines, ({ many }) => ({
  exerciseRoutines: many(exerciseRoutines),
  workouts: many(workouts),
}));

export const exerciseRoutines = sqliteTable("exercise_routines", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  active: integer("active", { mode: "boolean" }).notNull(),
  routineId: text("routine_id").references(() => routines.id).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});
export const exerciseRoutinesRelations = relations(exerciseRoutines, ({ one, many }) => ({
  routine: one(routines, {
    fields: [exerciseRoutines.routineId],
    references: [routines.id],
  }),
  setSchemes: many(setSchemes),
}));

export const setSchemes = sqliteTable("set_schemes", {
  id: text("id").primaryKey(),
  targetReps: integer("target_reps"),
  targetDuration: integer("target_duration"),
  setType: text("set_type").notNull().default("WORKING"),
  measurement: text("measurement").notNull().default("WEIGHT"),
  exerciseRoutineId: text("exercise_routine_id").references(() => exerciseRoutines.id).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});
export const setSchemesRelations = relations(setSchemes, ({ one, many }) => ({
  exerciseRoutine: one(exerciseRoutines, {
    fields: [setSchemes.exerciseRoutineId],
    references: [exerciseRoutines.id],
  }),
  setEnries: many(setEntries),
}));

export const workouts = sqliteTable("workouts", {
  id: text("id").primaryKey(),
  start: integer("start", { mode: "timestamp" }).notNull(),
  end: integer("end", { mode: "timestamp" }),
  routineId: text("routine_id").references(() => routines.id).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});
export const workoutsRelations = relations(workouts, ({ one, many }) => ({
  routine: one(routines, {
    fields: [workouts.routineId],
    references: [routines.id],
  }),
  exercises: many(exercises),
}));

export const exercises = sqliteTable("exercises", {
  id: text("id").primaryKey(),
  notes: text("notes").notNull(),
  workoutId: text("workout_id").references(() => workouts.id).notNull(),
  exerciseRoutineId: text("exercise_routine_id").references(() => exerciseRoutines.id).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});
export const exercisesRelations = relations(exercises, ({ one, many }) => ({
  workout: one(workouts, {
    fields: [exercises.workoutId],
    references: [workouts.id],
  }),
  exerciseRoutine: one(exerciseRoutines, {
    fields: [exercises.exerciseRoutineId],
    references: [exerciseRoutines.id],
  }),
  setEntries: many(setEntries),
}));

export const setEntries = sqliteTable("set_entries", {
  id: text("id").primaryKey(),
  weight: real("weight"),
  reps: integer("reps"),
  seconds: integer("seconds"),
  setType: text("set_type").notNull().default("WORKING"),
  measurement: text("measurement").notNull().default("WORKING"),
  exerciseId: text("exercise_id").references(() => exercises.id).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});
export const setEntriesRelations = relations(setEntries, ({ one }) => ({
  exercise: one(exercises, {
    fields: [setEntries.exerciseId],
    references: [exercises.id],
  }),
}));
