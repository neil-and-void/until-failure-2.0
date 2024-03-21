import { eq } from "drizzle-orm";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import * as Crypto from "expo-crypto";
import * as schema from "../schema";
import { exerciseRoutines, exercises, setEntries } from "../schema";

export class Exercises {
  private db: ExpoSQLiteDatabase<typeof schema>;

  constructor(db: ExpoSQLiteDatabase<typeof schema>) {
    this.db = db;
  }

  async createExercise(workoutId: string, exerciseRoutineId: string) {
    return await this.db.transaction(async (tx) => {
      const exerciseRoutine = await tx.query.exerciseRoutines.findFirst({
        where: eq(exerciseRoutines.id, exerciseRoutineId),
        with: {
          setSchemes: true,
        },
      });

      if (!exerciseRoutine) throw new Error("no exercise routine");

      const now = new Date();
      const exerciseId = Crypto.randomUUID();
      await tx.insert(exercises).values({
        id: exerciseId,
        workoutId,
        exerciseRoutineId,
        notes: "",
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      });

      const setEntryValues = exerciseRoutine.setSchemes.map(setScheme => {
        const id = Crypto.randomUUID();
        return {
          id,
          exerciseId,
          weight: null,
          reps: null,
          seconds: null,
          setType: setScheme.setType,
          measurement: setScheme.measurement,
          createdAt: now,
          updatedAt: now,
          deletedAt: null,
        };
      });

      await tx.insert(setEntries).values(setEntryValues);
    });
  }
}
