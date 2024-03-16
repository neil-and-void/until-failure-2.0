import { createContext } from "react";
import { ExerciseRoutines, Routines } from "../database/models";

type DatabaseModels = {
  db: {
    routines: Routines;
    exerciseRoutines: ExerciseRoutines;
  };
};

export const DatabaseContext = createContext<DatabaseModels>({} as any);
