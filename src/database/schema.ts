import { relations } from "drizzle-orm";
import {
  integer,
  primaryKey,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const exerciseRoutines = sqliteTable("exercise_routines", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  notes: text("notes").default("").notNull(),
  active: integer("active", { mode: "boolean" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});
export const exerciseRoutinesRelations = relations(
  exerciseRoutines,
  ({ many }) => ({
    setSchemes: many(setSchemes),
    exerciseRoutinesToRoutines: many(exerciseRoutinesToRoutines),
  }),
);

export const exerciseRoutinesToRoutines = sqliteTable(
  "exerciseRoutinesToRoutines",
  {
    exerciseRoutineId: text("exerciseRoutinesId")
      .notNull()
      .references(() => exerciseRoutines.id),
    routineId: text("routineId")
      .notNull()
      .references(() => routines.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.exerciseRoutineId, t.routineId] }),
  }),
);
export const exerciseRoutinesToRoutinesRelations = relations(
  exerciseRoutinesToRoutines,
  ({ one }) => ({
    exerciseRoutine: one(exerciseRoutines, {
      fields: [exerciseRoutinesToRoutines.exerciseRoutineId],
      references: [exerciseRoutines.id],
    }),
    routine: one(routines, {
      fields: [exerciseRoutinesToRoutines.routineId],
      references: [routines.id],
    }),
  }),
);

export const routines = sqliteTable("routines", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  active: integer("active", { mode: "boolean" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});
export const routinesRelations = relations(routines, ({ many }) => ({
  exerciseRoutinesToRoutines: many(exerciseRoutinesToRoutines),
  workouts: many(workouts),
}));

export const setSchemes = sqliteTable("set_schemes", {
  id: text("id").primaryKey(),
  targetReps: integer("target_reps"),
  targetDuration: integer("target_duration"),
  setType: text("set_type").notNull().default("WORKING"),
  measurement: text("measurement").notNull().default("WEIGHT"),
  exerciseRoutineId: text("exercise_routine_id")
    .references(() => exerciseRoutines.id)
    .notNull(),
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
  routineId: text("routine_id")
    .references(() => routines.id)
    .notNull(),
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
  workoutId: text("workout_id")
    .references(() => workouts.id)
    .notNull(),
  exerciseRoutineId: text("exercise_routine_id")
    .references(() => exerciseRoutines.id)
    .notNull(),
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
  exerciseId: text("exercise_id")
    .references(() => exercises.id)
    .notNull(),
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
