import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import CreateRoutine from "@until-failure-app/src/components/CreateRoutine/CreateRoutine";
import RoutineList from "@until-failure-app/src/components/RoutineList";
import { Sheet } from "@until-failure-app/src/components/Sheet";
import { DatabaseContext } from "@until-failure-app/src/contexts/DatabaseContext";
import { colors } from "@until-failure-app/src/theme";
import { Stack } from "expo-router";
import { styled } from "nativewind";
import { useCallback, useContext, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledBottomSheetBackdrop = styled(BottomSheetBackdrop);

export default function Routines() {
  const { db } = useContext(DatabaseContext);

  // Queries
  const { data: routines, isLoading: getRoutinesLoading } = useQuery({
    queryKey: ["routines"],
    queryFn: () => db.routines.getRoutines(),
  });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="px-4 flex flex-row justify-between">
        <Text className="text-white text-4xl self-start">Routines</Text>
        <Pressable
          onPress={() => handlePresentModalPress()}
          className="self-start"
        >
          <Text className="text-white text-3xl">+</Text>
        </Pressable>
      </View>

      <RoutineList routines={routines || []} loading={getRoutinesLoading} />

      <Sheet sheetRef={bottomSheetModalRef} snapPoints={["90%"]}>
        <View className="px-4">
          <CreateRoutine onCreate={() => bottomSheetModalRef.current?.close()} />
        </View>
      </Sheet>
    </SafeAreaView>
  );
}
