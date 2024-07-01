import { AntDesign } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { CreateExerciseRoutine } from "@until-failure-app/src/components/CreateExerciseRoutine";
import CreateRoutine from "@until-failure-app/src/components/CreateRoutine/CreateRoutine";
import { ExerciseLibrary } from "@until-failure-app/src/components/ExerciseLibrary";
import RoutineList from "@until-failure-app/src/components/RoutineList";
import { Sheet } from "@until-failure-app/src/components/Sheet";
import { DatabaseContext } from "@until-failure-app/src/contexts/DatabaseContext";
import clsx from "clsx";
import { Stack } from "expo-router";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

enum LibraryPage {
  EXERCISE_LIBRARY = "EXERCISE_LIBRARY",
  ROUTINES = "ROUTINES",
}

export default function Library() {
  const { db } = useContext(DatabaseContext);

  const [libraryPage, setLibraryPage] = useState(LibraryPage.ROUTINES);
  const [exerciseRoutinesPage, setExerciseRoutinesPage] = useState(0);

  // Queries
  const { data: routines, isLoading: getRoutinesLoading } = useQuery({
    queryKey: ["routines"],
    queryFn: () => db.routines.getRoutines(),
  });

  const { data: exerciseRoutines, isLoading: getExerciseRoutinessLoading } = useQuery({
    queryKey: ["exerciseRoutines"],
    queryFn: () => db.exerciseRoutines.getExerciseRoutines(exerciseRoutinesPage),
  });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const currentLibraryPage = useMemo(() => {
    if (libraryPage === LibraryPage.ROUTINES) {
      return <RoutineList routines={routines || []} loading={getRoutinesLoading} />;
    }

    if (libraryPage === LibraryPage.EXERCISE_LIBRARY) {
      return <ExerciseLibrary exerciseRoutines={exerciseRoutines || []} loading={getExerciseRoutinessLoading} />;
    }

    return null;
  }, [routines, getRoutinesLoading, libraryPage, exerciseRoutines, getExerciseRoutinessLoading]);

  const modalComponent = useMemo(() => {
    if (libraryPage === LibraryPage.ROUTINES) {
      return <CreateRoutine onCreate={() => bottomSheetModalRef.current?.close()} />;
    }

    if (libraryPage === LibraryPage.EXERCISE_LIBRARY) {
      return <CreateExerciseRoutine onCreate={() => bottomSheetModalRef.current?.close()} />;
    }

    return null;
  }, [libraryPage]);

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View>
        <View className="px-4 flex flex-row justify-between">
          <Text className="text-white text-4xl self-start">Library</Text>
          <Pressable
            onPress={() => handlePresentModalPress()}
            className="self-start py-2"
          >
            <AntDesign name="plus" size={24} color="white" />
          </Pressable>
        </View>

        <View className="flex flex-row gap-4 px-4">
          <Pressable className="self-start pr-1 py-3" onPress={() => setLibraryPage(LibraryPage.ROUTINES)}>
            <Text className={clsx("text-white", { "underline": libraryPage === LibraryPage.ROUTINES })}>Routines</Text>
          </Pressable>
          <Pressable className="self-start py-3 pl-1" onPress={() => setLibraryPage(LibraryPage.EXERCISE_LIBRARY)}>
            <Text className={clsx("text-white", { "underline": libraryPage === LibraryPage.EXERCISE_LIBRARY })}>
              Exercises
            </Text>
          </Pressable>
        </View>
      </View>

      {currentLibraryPage}

      <Sheet sheetRef={bottomSheetModalRef} snapPoints={["90%"]}>
        <View className="px-4">
          {modalComponent}
        </View>
      </Sheet>
    </SafeAreaView>
  );
}
