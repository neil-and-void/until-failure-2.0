import {
  CreateRoutine,
  ExerciseRoutine,
  MeasurementType,
  Routine,
  SetScheme,
  SetType,
  UpdateRoutine,
} from "@until-failure-app/src/types";
import { and, desc, eq, inArray, isNull } from "drizzle-orm";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import * as Crypto from "expo-crypto";
import {
  exerciseRoutines,
  exerciseRoutinesToRoutines as exerciseRoutinesToRoutinesTable,
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
    const routineList = await this.db.query.routines.findMany({
      limit,
      orderBy: [desc(routines.createdAt)],
      where: isNull(routines.deletedAt),
      with: {
        exerciseRoutinesToRoutines: {
          with: {
            exerciseRoutine: true,
          },
        },
      },
    });

    return routineList.map((routine) => {
      const exerciseRoutines = routine.exerciseRoutinesToRoutines.map(
        ({ exerciseRoutine }) => {
          return {
            id: exerciseRoutine.id,
            name: exerciseRoutine.name,
            active: exerciseRoutine.active,
            notes: exerciseRoutine.notes,
            createdAt: exerciseRoutine.createdAt,
            updatedAt: exerciseRoutine.updatedAt,
            deletedAt: exerciseRoutine.deletedAt,
            setSchemes: [], // empty to satisfy type
          };
        },
      );

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
    //   const routineQueryResults = await this.db
    //     .select()
    //     .from(routines)
    //     .leftJoin(
    //       exerciseRoutinesToRoutinesTable,
    //       eq(routines.id, exerciseRoutinesToRoutinesTable.routineId),
    //     )
    //     .where(and(eq(routines.id, id), isNull(routines.deletedAt)))
    //     .limit(1);
    //
    //   if (routineQueryResults.length < 1) {
    //     throw new Error("no routine found");
    //   }
    //
    //   const routine = routineQueryResults[0].routines;
    //
    //   const exerciseRoutineIds = routineQueryResults.reduce<string[]>(
    //     (accumulator, routineQueryResult) => {
    //       if (routineQueryResult.exerciseRoutinesToRoutines) {
    //         accumulator.push(
    //           routineQueryResult.exerciseRoutinesToRoutines.exerciseRoutineId,
    //         );
    //       }
    //       return accumulator;
    //     },
    //     [],
    //   );
    //
    //   if (exerciseRoutines.length === 0) {
    //     return {
    //       id: routine.id,
    //       name: routine.name,
    //       active: routine.active,
    //       createdAt: routine.createdAt,
    //       updatedAt: routine.updatedAt,
    //       deletedAt: routine.deletedAt,
    //       exerciseRoutines: [],
    //     };
    //   }
    //
    //   const activeExerciseRoutines = await this.db
    //     .select()
    //     .from(exerciseRoutines)
    //     .leftJoin(setSchemes, eq(exerciseRoutines.id, setSchemes.id))
    //     .where(
    //       and(
    //         inArray(exerciseRoutines.id, exerciseRoutineIds),
    //         isNull(exerciseRoutines.deletedAt),
    //       ),
    //     )
    //     .orderBy(exerciseRoutines.createdAt);
    //
    //   const setSchemeIds = activeExerciseRoutines.reduce<StringArrayMap>(
    //     (exerciseRoutineIdMap, exerciseRoutine) => {
    //       if (!exerciseRoutine.set_schemes) return exerciseRoutineIdMap;
    //
    //       const setSchemeId = exerciseRoutine.set_schemes.id;
    //
    //       if (!exerciseRoutineIdMap[exerciseRoutine.exercise_routines.id]) {
    //         exerciseRoutineIdMap[exerciseRoutine.exercise_routines.id] = [];
    //       }
    //
    //       return exerciseRoutineIdMap;
    //     },
    //     {},
    //   );
    //
    //   return {
    //     id: routine.id,
    //     name: routine.name,
    //     active: routine.active,
    //     createdAt: routine.createdAt,
    //     updatedAt: routine.updatedAt,
    //     deletedAt: routine.deletedAt,
    //     exerciseRoutines: [],
    //   };

    const routine = await this.db.query.routines.findFirst({
      where: and(eq(routines.id, id), isNull(routines.deletedAt)),
      with: {
        exerciseRoutinesToRoutines: {
          with: {
            exerciseRoutine: {
              with: {
                setSchemes: true,
              },
            },
          },
        },
      },
    });

    if (!routine) throw new Error("routine not found");

    const exerciseRoutines = routine.exerciseRoutinesToRoutines.reduce<
      ExerciseRoutine[]
    >((exerciseRoutines, { exerciseRoutine }) => {
      const setSchemes = exerciseRoutine.setSchemes.reduce<SetScheme[]>(
        (setSchemes, setScheme) => {
          if (!setScheme.deletedAt) {
            setSchemes.push({
              id: setScheme.id,
              createdAt: setScheme.createdAt,
              deletedAt: setScheme.deletedAt,
              updatedAt: setScheme.updatedAt,
              targetReps: setScheme.targetReps,
              targetDuration: setScheme.targetDuration,
              setType: setScheme.setType as SetType,
              measurement: setScheme.measurement as MeasurementType,
              exerciseRoutineId: setScheme.exerciseRoutineId,
            });
          }

          return setSchemes;
        },
        [],
      );

      if (!exerciseRoutine.deletedAt) {
        exerciseRoutines.push({
          id: exerciseRoutine.id,
          name: exerciseRoutine.name,
          active: exerciseRoutine.active,
          notes: exerciseRoutine.notes,
          createdAt: exerciseRoutine.createdAt,
          updatedAt: exerciseRoutine.updatedAt,
          deletedAt: exerciseRoutine.deletedAt,
          setSchemes,
        });
      }

      return exerciseRoutines;
    }, []);

    return {
      id: routine.id,
      name: routine.name,
      active: routine.active,
      createdAt: routine.createdAt,
      updatedAt: routine.updatedAt,
      deletedAt: routine.deletedAt,
      exerciseRoutines,
    };

    // if (!routine) {
    //   throw new Error("could not find routine");
    // }
    //
    // const exerciseRoutines = routine?.exerciseRoutines.map(
    //   (exerciseRoutine) => {
    //     const setSchemes = exerciseRoutine.setSchemes.map((setScheme) => {
    //       return {
    //         id: setScheme.id,
    //         createdAt: setScheme.createdAt,
    //         deletedAt: setScheme.deletedAt,
    //         updatedAt: setScheme.updatedAt,
    //         targetReps: setScheme.targetReps,
    //         targetDuration: setScheme.targetDuration,
    //         setType: setScheme.setType as SetType,
    //         measurement: setScheme.measurement as MeasurementType,
    //         exerciseRoutineId: setScheme.exerciseRoutineId,
    //       };
    //     });
    //
    //     return {
    //       id: exerciseRoutine.id,
    //       name: exerciseRoutine.name,
    //       active: exerciseRoutine.active,
    //       routineId: exerciseRoutine.routineId,
    //       createdAt: exerciseRoutine.createdAt,
    //       updatedAt: exerciseRoutine.updatedAt,
    //       deletedAt: exerciseRoutine.deletedAt,
    //       setSchemes,
    //     };
    //   },
    // );
    //
    // return {
    //   id: routine.id,
    //   name: routine.name,
    //   active: routine.active,
    //   createdAt: routine.createdAt,
    //   updatedAt: routine.updatedAt,
    //   deletedAt: routine.deletedAt,
    //   exerciseRoutines,
    // };
  }

  async updateRoutine(routine: UpdateRoutine) {
    return await this.db.update(routines).set({ name: routine.name });
  }

  async deleteRoutine(id: string) {
    return await this.db.transaction(async (tx) => {
      await tx.delete(routines).where(eq(routines.id, id));

      const deletedWorkouts = await tx
        .delete(workouts)
        .where(eq(workouts.routineId, id))
        .returning({
          id: workouts.id,
        });
      const deletedWorkoutIds = deletedWorkouts.map(
        (deletedWorkout) => deletedWorkout.id,
      );

      // delete exercises
      const deletedExercises = await tx
        .delete(exercises)
        .where(inArray(exercises.workoutId, deletedWorkoutIds))
        .returning({
          id: exercises.id,
        });
      const deletedExerciseIds = deletedExercises.map(
        (deletedExercise) => deletedExercise.id,
      );

      // delete set entries
      await tx
        .delete(setEntriesTable)
        .where(inArray(setEntriesTable.exerciseId, deletedExerciseIds));

      const deletedExerciseRoutines = await tx
        .delete(exerciseRoutines)
        .where(eq(exerciseRoutines.routineId, id))
        .returning({
          id: exerciseRoutines.id,
        });

      const deletedExerciseRoutineIds = deletedExerciseRoutines.map(
        (deletedExerciseRoutine) => deletedExerciseRoutine.id,
      );

      await tx
        .delete(setSchemes)
        .where(
          inArray(setSchemes.exerciseRoutineId, deletedExerciseRoutineIds),
        );
    });
  }

  async addExerciseRoutine(routineId: string, exerciseRoutineId: string) {
    const res = await this.db.insert(exerciseRoutinesToRoutinesTable).values({
      routineId,
      exerciseRoutineId,
    });
    return res;
  }

  async removeExerciseRoutine(routineId: string, exerciseRoutineId: string) {
    return await this.db
      .delete(exerciseRoutinesToRoutinesTable)
      .where(
        and(
          eq(exerciseRoutinesToRoutinesTable.routineId, routineId),
          eq(
            exerciseRoutinesToRoutinesTable.exerciseRoutineId,
            exerciseRoutineId,
          ),
        ),
      );
  }
}
