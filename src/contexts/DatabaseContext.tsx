import { createContext } from "react";
import { ExerciseRoutines, Exercises, Routines, SetSchemes, Workouts } from "../database/models";

type DatabaseModels = {
  db: {
    routines: Routines;
    exerciseRoutines: ExerciseRoutines;
    setSchemes: SetSchemes;
    workouts: Workouts;
    exercises: Exercises;
  };
};

export const DatabaseContext = createContext<DatabaseModels>({} as any);
