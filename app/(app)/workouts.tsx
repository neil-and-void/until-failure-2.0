import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { WorkoutList } from "@until-failure-app/src/components/WorkoutList/WorkoutList";
import { DatabaseContext } from "@until-failure-app/src/contexts/DatabaseContext";
import { colors } from "@until-failure-app/src/theme";
import { styled } from "nativewind";
import { useCallback, useContext, useRef } from "react";
import { FlatList, Pressable, Text, TouchableOpacity, View } from "react-native";
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
      // todo
      console.log("TODO go to the workouts list");
    },
  });

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  return (
    <SafeAreaView className="px-4">
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

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={["50%", "92%"]}
        onChange={handleSheetChanges}
        backdropComponent={(backdropProps) => (
          <StyledBottomSheetBackdrop
            className="bg-red-400"
            opacity={9}
            enableTouchThrough={false}
            {...backdropProps}
          />
        )}
        backgroundStyle={{
          backgroundColor: colors.secondary["900"],
        }}
        style={{
          shadowColor: "#ff0000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View className="p-4">
          <View className="pb-2">
            <Text className="text-white">Choose a routine to start</Text>
          </View>
          <FlatList
            className="bg-secondary-800 rounded-2xl"
            data={routines || []}
            renderItem={({ item: routine }) => (
              <TouchableOpacity onPress={() => createWorkout(routine.id)} className="flex flex-row justify-start p-4">
                <Text className="text-white text-lg ">{routine.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(routine) => routine.id}
          />
        </View>
      </BottomSheetModal>
    </SafeAreaView>
  );
}
