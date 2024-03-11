import migrations from "@until-failure-app/drizzle/migrations";
import { DatabaseContext } from "@until-failure-app/src/contexts/DatabaseContext";
import database from "@until-failure-app/src/database/database";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { ReactNode } from "react";

interface DatabaseProviderProps {
  children: ReactNode;
}

const DatabaseProvider = ({ children }: DatabaseProviderProps) => {
  const { success, error } = useMigrations(database, migrations);
  console.log(success, error);

  return (
    <DatabaseContext.Provider value={database}>
      {children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseProvider;
