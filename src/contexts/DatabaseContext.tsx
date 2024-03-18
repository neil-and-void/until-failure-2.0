import { createContext } from "react";
import { ExerciseRoutines, Routines, SetSchemes, Workouts } from "../database/models";

type DatabaseModels = {
  db: {
    routines: Routines;
    exerciseRoutines: ExerciseRoutines;
    setSchemes: SetSchemes;
    workouts: Workouts;
  };
};

export const DatabaseContext = createContext<DatabaseModels>({} as any);
