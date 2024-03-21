import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Sheet } from "@until-failure-app/src/components/Sheet";
import { WorkoutList } from "@until-failure-app/src/components/WorkoutList/WorkoutList";
import { DatabaseContext } from "@until-failure-app/src/contexts/DatabaseContext";
import { colors } from "@until-failure-app/src/theme";
import { router } from "expo-router";
import { Stack } from "expo-router";
import { styled } from "nativewind";
import { useCallback, useContext, useRef } from "react";
import { Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledBottomSheetBackdrop = styled(BottomSheetBackdrop);

export default function Workouts() {
  const { db } = useContext(DatabaseContext);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const queryClient = useQueryClient();

  const { data: workouts, isLoading: getWorkoutsLoading } = useQuery({
    queryKey: ["workouts"],
    queryFn: () => db.workouts.getWorkouts(20),
  });

  const { data: routines, isLoading: getRoutinesLoading } = useQuery({
    queryKey: ["routines"],
    queryFn: () => db.routines.getRoutines(),
  });

  const { mutate: createWorkout } = useMutation({
    mutationFn: (routineId: string) => db.workouts.createWorkout(routineId),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["workouts"],
      });
    },
    onError: (err) => {
      // todo
      console.log(err);
    },
    onSuccess: (newWorkout) => {
      bottomSheetModalRef.current?.close();
      queryClient.invalidateQueries({
        queryKey: ["workout", newWorkout.id],
      });
      router.push(`/workouts/${newWorkout.id}`);
    },
  });

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <SafeAreaView className="">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View className="px-4 flex flex-row justify-between">
        <Text className="text-white text-4xl self-start">Workouts</Text>
        <Pressable
          onPress={() => handlePresentModalPress()}
          className="self-start"
        >
          <Text className="text-white text-3xl">+</Text>
        </Pressable>
      </View>

      <WorkoutList workouts={workouts} loading={getWorkoutsLoading} />

      <Sheet sheetRef={bottomSheetModalRef} snapPoints={["50%"]}>
        <ScrollView className="p-4">
          <View className="pb-2">
            <Text className="text-white">Choose a routine to start</Text>
          </View>
          <View className="bg-secondary-800 rounded-2xl">
            {routines?.map(routine => (
              <TouchableOpacity
                onPress={() => createWorkout(routine.id)}
                className="flex flex-row justify-start p-4"
                key={routine.id}
              >
                <Text className="text-white text-lg ">{routine.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </Sheet>
    </SafeAreaView>
  );
}
