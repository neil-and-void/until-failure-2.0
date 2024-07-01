import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { PickExerciseRoutines } from "@until-failure-app/src/components/PickExerciseRoutines";
import { Routine } from "@until-failure-app/src/components/Routine";
import { Sheet } from "@until-failure-app/src/components/Sheet";
import { DatabaseContext } from "@until-failure-app/src/contexts/DatabaseContext";

import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useContext, useRef } from "react";
import { Button, View } from "react-native";

function ViewRoutine() {
  const { db } = useContext(DatabaseContext);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { routineId } = useLocalSearchParams();

  const handleOpenModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModal = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const { data: routine, isLoading: routineLoading } = useQuery({
    queryKey: ["routine", routineId],
    queryFn: () => db.routines.getRoutine(routineId as string),
  });

  return (
    <>
      <View>
        <Stack.Screen
          options={{
            headerBackTitle: "routines",
            title: "Routine",
            headerRight: () => <Button onPress={handleOpenModal} title="edit" />,
          }}
        />

        <Routine routine={routine} loading={routineLoading} />
      </View>

      <Sheet sheetRef={bottomSheetModalRef} snapPoints={["90%"]} enablePanDownToClose={false}>
        <PickExerciseRoutines
          selectedExerciseRoutines={routine?.exerciseRoutines || []}
          onCancelPress={handleCloseModal}
          routineId={routineId as string}
        />
      </Sheet>
    </>
  );
}

export default ViewRoutine;
