import { createContext } from "react";
import { ExerciseRoutines, Routines, SetSchemes } from "../database/models";

type DatabaseModels = {
  db: {
    routines: Routines;
    exerciseRoutines: ExerciseRoutines;
    setSchemes: SetSchemes;
  };
};

export const DatabaseContext = createContext<DatabaseModels>({} as any);
