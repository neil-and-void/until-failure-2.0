import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { exerciseRoutines, exercises, setEntries, setSchemes } from "../schema";
import * as schema from "../schema";

import { NewExerciseRoutine, UpdateExerciseRoutine } from "@until-failure-app/src/types";
import { eq, inArray } from "drizzle-orm";
import * as Crypto from "expo-crypto";

export class ExerciseRoutines {
  private db: ExpoSQLiteDatabase<typeof schema>;

  constructor(db: ExpoSQLiteDatabase<typeof schema>) {
    this.db = db;
  }

  async createExerciseRoutine(newExerciseRoutine: NewExerciseRoutine) {
    const now = new Date();
    console.log(newExerciseRoutine);

    const a = await this.db.insert(exerciseRoutines).values({
      id: Crypto.randomUUID(),
      name: newExerciseRoutine.name,
      active: true,
      routineId: newExerciseRoutine.routineId,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
    return a;
  }

  async updateExerciseRoutine(updatedExerciseRoutine: UpdateExerciseRoutine) {
    await this.db.update(exerciseRoutines)
      .set({ name: updatedExerciseRoutine.name })
      .where(eq(exerciseRoutines.id, updatedExerciseRoutine.id));
  }

  async deleteExerciseRoutine(id: string) {
    return await this.db.transaction(async (tx) => {
      const now = new Date();

      await tx.update(exerciseRoutines).set({ deletedAt: now }).where(eq(exerciseRoutines.id, id));

      await tx.update(setSchemes).set({ deletedAt: now }).where(eq(setSchemes.exerciseRoutineId, id));

      const deletedExercises = await tx.update(exercises).set({ deletedAt: now }).where(
        eq(exercises.exerciseRoutineId, id),
      ).returning({
        exerciseId: exercises.id,
      });

      if (deletedExercises.length) {
        const exerciseIds = deletedExercises.map(deletedExercise => deletedExercise.exerciseId);
        console.log(exerciseIds, deletedExercises);

        await tx.update(setEntries).set({ deletedAt: now }).where(inArray(setEntries.exerciseId, exerciseIds));
      }
    });
  }
}
