import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { exerciseRoutines } from "../schema";
import * as schema from "../schema";

import { NewExerciseRoutine, UpdateExerciseRoutine } from "@until-failure-app/src/types";
import { eq } from "drizzle-orm";
import * as Crypto from "expo-crypto";

export class ExerciseRoutines {
  private db: ExpoSQLiteDatabase<typeof schema>;

  constructor(db: ExpoSQLiteDatabase<typeof schema>) {
    this.db = db;
  }

  async createExerciseRoutine(newExerciseRoutine: NewExerciseRoutine) {
    const now = new Date();

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
}
