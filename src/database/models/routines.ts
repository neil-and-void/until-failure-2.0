import { CreateRoutine, MeasurementType, Routine, SetType, UpdateRoutine } from "@until-failure-app/src/types";
import { and, eq, inArray, isNull } from "drizzle-orm";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import * as Crypto from "expo-crypto";
import {
  exerciseRoutines,
  exerciseRoutines as exerciseRoutinesTable,
  exercises,
  routines,
  setEntries as setEntriesTable,
  setSchemes,
  workouts,
} from "../schema";
import * as schema from "../schema";

export class Routines {
  private db: ExpoSQLiteDatabase<typeof schema>;

  constructor(db: ExpoSQLiteDatabase<typeof schema>) {
    this.db = db;
  }

  async createRoutine(routine: CreateRoutine) {
    const now = new Date();
    const id = Crypto.randomUUID();

    return await this.db.insert(routines).values({
      id,
      name: routine.name,
      active: true,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
  }

  async getRoutines(limit: number = 20): Promise<Routine[]> {
    const routineList = await this.db.query.routines.findMany({ limit, with: { exerciseRoutines: true } });

    return routineList.map(routine => {
      const exerciseRoutines = routine.exerciseRoutines.map((exerciseRoutine) => {
        return {
          id: exerciseRoutine.id,
          name: exerciseRoutine.name,
          active: exerciseRoutine.active,
          routineId: exerciseRoutine.routineId,
          createdAt: exerciseRoutine.createdAt,
          updatedAt: exerciseRoutine.updatedAt,
          deletedAt: exerciseRoutine.deletedAt,
          setSchemes: [], // empty to satisfy type
        };
      });

      return {
        id: routine.id,
        name: routine.name,
        active: routine.active,
        createdAt: routine.createdAt,
        deletedAt: routine.deletedAt,
        updatedAt: routine.updatedAt,
        exerciseRoutines,
      };
    });
  }

  async getRoutine(id: string): Promise<Routine> {
    const routine = await this.db.query.routines.findFirst({
      where: and(eq(routines.id, id), isNull(routines.deletedAt)),
      with: {
        exerciseRoutines: {
          where: isNull(exerciseRoutinesTable.deletedAt),
          with: { setSchemes: { where: isNull(setSchemes.deletedAt) } },
        },
      },
    });

    if (!routine) {
      throw new Error("could not find routine");
    }

    const exerciseRoutines = routine?.exerciseRoutines.map(exerciseRoutine => {
      const setSchemes = exerciseRoutine.setSchemes.map(setScheme => {
        return {
          id: setScheme.id,
          createdAt: setScheme.createdAt,
          deletedAt: setScheme.deletedAt,
          updatedAt: setScheme.updatedAt,
          targetReps: setScheme.targetReps,
          targetDuration: setScheme.targetDuration,
          setType: setScheme.setType as SetType,
          measurement: setScheme.measurement as MeasurementType,
          exerciseRoutineId: setScheme.exerciseRoutineId,
        };
      });

      return {
        id: exerciseRoutine.id,
        name: exerciseRoutine.name,
        active: exerciseRoutine.active,
        routineId: exerciseRoutine.routineId,
        createdAt: exerciseRoutine.createdAt,
        updatedAt: exerciseRoutine.updatedAt,
        deletedAt: exerciseRoutine.deletedAt,
        setSchemes,
      };
    });

    return {
      id: routine.id,
      name: routine.name,
      active: routine.active,
      createdAt: routine.createdAt,
      updatedAt: routine.updatedAt,
      deletedAt: routine.deletedAt,
      exerciseRoutines,
    };
  }

  async updateRoutine(routine: UpdateRoutine) {
    return await this.db.update(routines).set({ name: routine.name });
  }

  async deleteRoutine(id: string) {
    return await this.db.transaction(async (tx) => {
      await tx.delete(routines).where(eq(routines.id, id));

      const deletedWorkouts = await tx.delete(workouts).where(eq(workouts.routineId, id))
        .returning({
          id: workouts.id,
        });
      const deletedWorkoutIds = deletedWorkouts.map(deletedWorkout => deletedWorkout.id);

      // delete exercises
      const deletedExercises = await tx.delete(exercises).where(inArray(exercises.workoutId, deletedWorkoutIds))
        .returning({
          id: exercises.id,
        });
      const deletedExerciseIds = deletedExercises.map(deletedExercise => deletedExercise.id);

      // delete set entries
      await tx.delete(setEntriesTable).where(
        inArray(setEntriesTable.exerciseId, deletedExerciseIds),
      );

      const deletedExerciseRoutines = await tx.delete(exerciseRoutines).where(eq(exerciseRoutines.routineId, id))
        .returning({
          id: exerciseRoutines.id,
        });

      const deletedExerciseRoutineIds = deletedExerciseRoutines.map(deletedExerciseRoutine =>
        deletedExerciseRoutine.id
      );

      await tx.delete(setSchemes).where(inArray(setSchemes.exerciseRoutineId, deletedExerciseRoutineIds));
    });
  }
}
