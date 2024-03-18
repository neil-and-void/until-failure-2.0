import { Workout } from "@until-failure-app/src/types";
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
      limit,
    });

    return workouts.map(workout => {
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

  async getWorkout(id: string) {
    const workout = await this.db.query.workouts.findFirst({
      with: {
        exercises: {
          with: {
            exerciseRoutine: true,
            setEntries: {
              with: {
                setScheme: true,
              },
            },
          },
        },
      },
    });
    return workout;
  }
}
