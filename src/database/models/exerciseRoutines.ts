import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { exerciseRoutines, exercises, setEntries, setSchemes } from "../schema";
import * as schema from "../schema";

import {
  ExerciseRoutine,
  MeasurementType,
  NewExerciseRoutine,
  SetType,
  UpdateExerciseRoutine,
} from "@until-failure-app/src/types";
import { eq, inArray, isNull, like } from "drizzle-orm";
import * as Crypto from "expo-crypto";

export class ExerciseRoutines {
  private db: ExpoSQLiteDatabase<typeof schema>;

  constructor(db: ExpoSQLiteDatabase<typeof schema>) {
    this.db = db;
  }

  async createExerciseRoutine(newExerciseRoutine: NewExerciseRoutine) {
    const now = new Date();

    return await this.db.insert(exerciseRoutines).values({
      id: Crypto.randomUUID(),
      name: newExerciseRoutine.name,
      notes: "",
      active: true,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
  }

  async getExerciseRoutine(id: string): Promise<ExerciseRoutine | null> {
    const exerciseRoutine = await this.db.query.exerciseRoutines.findFirst({
      where: eq(exerciseRoutines.id, id),
      with: {
        setSchemes: true,
      },
    });

    if (!exerciseRoutine) return null;

    const setSchemes = [];
    for (const setScheme of exerciseRoutine.setSchemes) {
      if (setScheme.deletedAt) continue;

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

    return {
      id: exerciseRoutine.id,
      name: exerciseRoutine.name,
      notes: exerciseRoutine.notes,
      active: exerciseRoutine.active,
      createdAt: exerciseRoutine.createdAt,
      updatedAt: exerciseRoutine.createdAt,
      deletedAt: exerciseRoutine.deletedAt,
      setSchemes,
    };
  }

  async getExerciseRoutines(
    limit: number = 40,
    page: number = 0,
  ): Promise<ExerciseRoutine[]> {
    const offset = limit * page;

    const exerciseRoutineList = await this.db
      .select()
      .from(exerciseRoutines)
      .where(isNull(exerciseRoutines.deletedAt))
      .limit(limit)
      .offset(offset);

    return exerciseRoutineList.map((exerciseRoutine) => {
      return {
        id: exerciseRoutine.id,
        name: exerciseRoutine.name,
        notes: exerciseRoutine.notes,
        active: exerciseRoutine.active,
        createdAt: exerciseRoutine.createdAt,
        updatedAt: exerciseRoutine.createdAt,
        deletedAt: exerciseRoutine.deletedAt,
        setSchemes: [], // to satisfy typescript
      };
    });
  }

  async updateExerciseRoutine(updatedExerciseRoutine: UpdateExerciseRoutine) {
    await this.db
      .update(exerciseRoutines)
      .set({ name: updatedExerciseRoutine.name })
      .where(eq(exerciseRoutines.id, updatedExerciseRoutine.id));
  }

  async getAllExerciseRoutines(): Promise<ExerciseRoutine[]> {
    const exerciseRoutineResults = await this.db
      .select()
      .from(exerciseRoutines)
      .where(isNull(exerciseRoutines.deletedAt));

    return exerciseRoutineResults.map((exerciseRoutine) => ({
      id: exerciseRoutine.id,
      name: exerciseRoutine.name,
      notes: exerciseRoutine.notes,
      active: exerciseRoutine.active,
      setSchemes: [],
      createdAt: exerciseRoutine.createdAt,
      updatedAt: exerciseRoutine.updatedAt,
      deletedAt: exerciseRoutine.deletedAt,
    }));
  }

  async deleteExerciseRoutine(id: string) {
    return await this.db.transaction(async (tx) => {
      const now = new Date();

      await tx
        .update(exerciseRoutines)
        .set({ deletedAt: now })
        .where(eq(exerciseRoutines.id, id));

      // await tx
      //   .update(setSchemes)
      //   .set({ deletedAt: now })
      //   .where(eq(setSchemes.exerciseRoutineId, id));
      //
      // const deletedExercises = await tx
      //   .update(exercises)
      //   .set({ deletedAt: now })
      //   .where(eq(exercises.exerciseRoutineId, id))
      //   .returning({
      //     exerciseId: exercises.id,
      //   });
      //
      // if (deletedExercises.length) {
      //   const exerciseIds = deletedExercises.map(
      //     (deletedExercise) => deletedExercise.exerciseId,
      //   );
      //
      //   await tx
      //     .update(setEntries)
      //     .set({ deletedAt: now })
      //     .where(inArray(setEntries.exerciseId, exerciseIds));
      // }
    });
  }
}
