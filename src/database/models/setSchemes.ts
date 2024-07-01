import { NewSetScheme, UpdateSetScheme } from "@until-failure-app/src/types";
import { eq } from "drizzle-orm";
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
      measurement: newSetScheme.measurement,
      setType: newSetScheme.setType,
      exerciseRoutineId: newSetScheme.exerciseRoutineId,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
  }

  async updateSetScheme(updatedSetScheme: UpdateSetScheme) {
    const now = new Date();

    return await this.db
      .update(setSchemes)
      .set({
        targetReps: updatedSetScheme.targetReps,
        measurement: updatedSetScheme.measurement,
        setType: updatedSetScheme.setType,
        updatedAt: now,
      })
      .where(eq(setSchemes.id, updatedSetScheme.id));
  }

  async deleteSetScheme(id: string) {
    const now = new Date();

    return await this.db
      .update(setSchemes)
      .set({
        deletedAt: now,
      })
      .where(eq(setSchemes.id, id));
  }
}
