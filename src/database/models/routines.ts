import { CreateRoutine, Routine, UpdateRoutine } from "@until-failure-app/src/types";
import { eq } from "drizzle-orm";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { routines } from "../schema";
import * as schema from "../schema";

export class Routines {
  private db: ExpoSQLiteDatabase<typeof schema>;

  constructor(db: ExpoSQLiteDatabase<typeof schema>) {
    this.db = db;
  }

  async createRoutine(routine: CreateRoutine) {
    const now = new Date();

    return await this.db.insert(routines).values({
      name: routine.name,
      active: true,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
  }

  async getRoutines(limit: number = 20) {
    const routineList = await this.db.query.routines.findMany({ limit, with: { exerciseRoutines: true } });
    return routineList.map(routine => {
      const exerciseRoutines = routine.exerciseRoutines.map(exerciseRoutine => {
        return {
          id: exerciseRoutine.id,
          name: exerciseRoutine.name,
          active: exerciseRoutine.active,
          routineId: exerciseRoutine.routineId,
          createdAt: exerciseRoutine.createdAt,
          updatedAt: exerciseRoutine.updatedAt,
          deletedAt: exerciseRoutine.deletedAt,
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

  async getRoutine(id: string) {
    const routine = await this.db.query.routines.findFirst({
      where: eq(routines.id, id),
      with: { exerciseRoutines: { with: { setSchemes: true } } },
    });

    return routine;
  }

  async updateRoutines(routine: UpdateRoutine) {
  }

  async deleteRoutine(id: string) {
    const a = new Date();
  }
}
