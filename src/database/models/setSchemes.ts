import { NewSetScheme } from "@until-failure-app/src/types";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import * as Crypto from "expo-crypto";
import * as schema from "../schema";
import { setSchemes } from "../schema";

export class SetSchemes {
  private db: ExpoSQLiteDatabase<typeof schema>;

  constructor(db: ExpoSQLiteDatabase<typeof schema>) {
    this.db = db;
  }

  async createSetScheme(newSetScheme: NewSetScheme) {
    const now = new Date();

    return await this.db.insert(setSchemes).values({
      id: Crypto.randomUUID(),
      targetReps: newSetScheme.targetReps,
      measurement: newSetScheme.measurement,
      setType: newSetScheme.setType,
      exerciseRoutineId: newSetScheme.exerciseRoutineId,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
  }
}
