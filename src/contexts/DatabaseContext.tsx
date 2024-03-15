import { createContext } from "react";
import { Routines } from "../database/models/routines";

type DatabaseModels = {
  db: {
    routines: Routines;
  };
};

export const DatabaseContext = createContext<DatabaseModels>({} as any);
