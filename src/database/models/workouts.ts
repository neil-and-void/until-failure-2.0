import {
  MeasurementType,
  SetType,
  Workout,
} from "@until-failure-app/src/types";
import { desc, eq } from "drizzle-orm";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import * as Crypto from "expo-crypto";
import * as schema from "../schema";
import { workouts } from "../schema";

export class Workouts {
  private db: ExpoSQLiteDatabase<typeof schema>;

  constructor(db: ExpoSQLiteDatabase<typeof schema>) {
    this.db = db;
  }

  async getWorkouts(limit: number = 20): Promise<Workout[]> {
    const workouts = await this.db.query.workouts.findMany({
      with: {
        exercises: true,
        routine: true,
      },
      orderBy: desc(schema.workouts.start),
      limit,
    });

    const workoutList = workouts.map((workout) => {
      if (!workout.routine) throw new Error("routine is null for workout");

      const routine = {
        id: workout.routine.id,
        name: workout.routine.name,
        active: workout.routine.active,
        exerciseRoutines: [], // needed to satisfy type
        createdAt: workout.routine.createdAt,
        updatedAt: workout.routine.updatedAt,
        deletedAt: workout.routine.deletedAt,
      };

      return {
        id: workout.id,
        start: workout.start,
        end: workout.end,
        routineId: workout.routineId,
        createdAt: workout.createdAt,
        updatedAt: workout.updatedAt,
        deletedAt: workout.deletedAt,
        exercises: [], // needed to satisfy type
        routine,
      };
    });

    return workoutList;
  }

  async createWorkout(routineId: string) {
    const now = new Date();
    const id = Crypto.randomUUID();

    const workoutValues = {
      id,
      routineId,
      start: now,
      end: null,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    };

    await this.db.insert(workouts).values(workoutValues);
    return workoutValues;
  }

  async getFirstWorkout(): Promise<Workout> {
    const workout = await this.db.query.workouts.findFirst({
      with: {
        routine: true,
        exercises: {
          with: {
            exerciseRoutine: {
              with: {
                setSchemes: true,
              },
            },
            setEntries: true,
          },
        },
      },
    });

    if (!workout) throw new Error("no workout found");

    const exercises = workout.exercises.map((exercise) => {
      const setEntries = [];
      for (const setEntry of exercise.setEntries) {
        setEntries.push({
          id: setEntry.id,
          weight: setEntry.weight,
          reps: setEntry.reps,
          seconds: setEntry.seconds,
          setType: setEntry.setType as SetType,
          measurement: setEntry.measurement as MeasurementType,
          exerciseId: setEntry.exerciseId,
          createdAt: setEntry.createdAt,
          updatedAt: setEntry.updatedAt,
          deletedAt: setEntry.deletedAt,
        });
      }

      const setSchemes = [];
      for (const setScheme of exercise.exerciseRoutine.setSchemes) {
        setSchemes.push({
          id: setScheme.id,
          targetReps: setScheme.targetReps,
          targetDuration: setScheme.targetDuration,
          setType: setScheme.setType as SetType,
          measurement: setScheme.measurement as MeasurementType,
          exerciseRoutineId: setScheme.exerciseRoutineId,
          createdAt: setScheme.createdAt,
          updatedAt: setScheme.updatedAt,
          deletedAt: setScheme.deletedAt,
        });
      }

      const exerciseRoutine = {
        id: exercise.exerciseRoutine.id,
        name: exercise.exerciseRoutine.name,
        active: exercise.exerciseRoutine.active,
        routineId: exercise.exerciseRoutine.routineId,
        createdAt: exercise.exerciseRoutine.createdAt,
        updatedAt: exercise.exerciseRoutine.updatedAt,
        deletedAt: exercise.exerciseRoutine.deletedAt,
        setSchemes,
      };

      return {
        id: exercise.id,
        notes: exercise.notes,
        workoutId: exercise.workoutId,
        exerciseRoutineId: exercise.exerciseRoutineId,
        createdAt: exercise.createdAt,
        updatedAt: exercise.updatedAt,
        deletedAt: exercise.deletedAt,
        exerciseRoutine,
        setEntries,
      };
    });

    const routine = {
      id: workout.routine.id,
      name: workout.routine.name,
      active: workout.routine.active,
      createdAt: workout.routine.createdAt,
      updatedAt: workout.routine.updatedAt,
      deletedAt: workout.routine.deletedAt,
      exerciseRoutines: [], // don't need
    };

    return {
      id: workout.id,
      start: workout.start,
      end: workout.end,
      routineId: workout.routineId,
      createdAt: workout.createdAt,
      updatedAt: workout.updatedAt,
      deletedAt: workout.deletedAt,
      exercises,
      routine,
    };
  }

  async getWorkout(id: string): Promise<Workout> {
    const workout = await this.db.query.workouts.findFirst({
      where: eq(workouts.id, id),
      with: {
        routine: true,
        exercises: {
          with: {
            exerciseRoutine: {
              with: {
                setSchemes: true,
              },
            },
            setEntries: true,
          },
        },
      },
    });

    if (!workout) throw new Error("no workout found");

    const exercises = workout.exercises.map((exercise) => {
      const setEntries = [];
      for (const setEntry of exercise.setEntries) {
        setEntries.push({
          id: setEntry.id,
          weight: setEntry.weight,
          reps: setEntry.reps,
          seconds: setEntry.seconds,
          setType: setEntry.setType as SetType,
          measurement: setEntry.measurement as MeasurementType,
          exerciseId: setEntry.exerciseId,
          createdAt: setEntry.createdAt,
          updatedAt: setEntry.updatedAt,
          deletedAt: setEntry.deletedAt,
        });
      }

      const setSchemes = [];
      for (const setScheme of exercise.exerciseRoutine.setSchemes) {
        setSchemes.push({
          id: setScheme.id,
          targetReps: setScheme.targetReps,
          targetDuration: setScheme.targetDuration,
          setType: setScheme.setType as SetType,
          measurement: setScheme.measurement as MeasurementType,
          exerciseRoutineId: setScheme.exerciseRoutineId,
          createdAt: setScheme.createdAt,
          updatedAt: setScheme.updatedAt,
          deletedAt: setScheme.deletedAt,
        });
      }

      const exerciseRoutine = {
        id: exercise.exerciseRoutine.id,
        name: exercise.exerciseRoutine.name,
        active: exercise.exerciseRoutine.active,
        routineId: exercise.exerciseRoutine.routineId,
        createdAt: exercise.exerciseRoutine.createdAt,
        updatedAt: exercise.exerciseRoutine.updatedAt,
        deletedAt: exercise.exerciseRoutine.deletedAt,
        setSchemes,
      };

      return {
        id: exercise.id,
        notes: exercise.notes,
        workoutId: exercise.workoutId,
        exerciseRoutineId: exercise.exerciseRoutineId,
        createdAt: exercise.createdAt,
        updatedAt: exercise.updatedAt,
        deletedAt: exercise.deletedAt,
        exerciseRoutine,
        setEntries,
      };
    });

    const routine = {
      id: workout.routine.id,
      name: workout.routine.name,
      active: workout.routine.active,
      createdAt: workout.routine.createdAt,
      updatedAt: workout.routine.updatedAt,
      deletedAt: workout.routine.deletedAt,
      exerciseRoutines: [], // don't need
    };

    return {
      id: workout.id,
      start: workout.start,
      end: workout.end,
      routineId: workout.routineId,
      createdAt: workout.createdAt,
      updatedAt: workout.updatedAt,
      deletedAt: workout.deletedAt,
      exercises,
      routine,
    };
  }
}
