import migrations from "@until-failure-app/drizzle/migrations";
import { DatabaseContext } from "@until-failure-app/src/contexts/DatabaseContext";
import database from "@until-failure-app/src/database";
import { ExerciseRoutines, Routines, SetSchemes, Workouts } from "@until-failure-app/src/database/models";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { ReactNode, useMemo } from "react";
import { Text, View } from "react-native";

interface DatabaseProviderProps {
  children: ReactNode;
}

const DatabaseProvider = ({ children }: DatabaseProviderProps) => {
  const { success, error } = useMigrations(database, migrations);

  const db = useMemo(() => {
    return {
      db: {
        routines: new Routines(database),
        exerciseRoutines: new ExerciseRoutines(database),
        setSchemes: new SetSchemes(database),
        workouts: new Workouts(database),
      },
    };
  }, []);

  if (error) {
    return (
      <View>
        <Text>Something went wrong reading the db :/</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View>
        <Text>migrating...</Text>
      </View>
    );
  }

  return (
    <DatabaseContext.Provider value={db}>
      {children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseProvider;
