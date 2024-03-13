import { CreateRoutine, UpdateRoutine } from "@until-failure-app/src/types";
import { eq } from "drizzle-orm";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import * as Crypto from "expo-crypto";
import { routines } from "../schema";

export class Routines {
  private db: ExpoSQLiteDatabase;

  constructor(db: ExpoSQLiteDatabase) {
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

  async getRoutines(limit: number = 20) {
    return await this.db.select().from(routines).limit(limit);
  }

  async getRoutine(id: string) {
    return await this.db.select().from(routines).where(eq(routines.id, id));
  }

  async updateRoutines(routine: UpdateRoutine) {
  }

  async deleteRoutine(id: string) {
    const a = new Date();
  }
}
