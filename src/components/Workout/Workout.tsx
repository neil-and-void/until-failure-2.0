import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DatabaseContext } from "@until-failure-app/src/contexts/DatabaseContext";
import { Workout as WorkoutType } from "@until-failure-app/src/types";
import { useContext, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../Button";
import { Exercise } from "../Exercise";
import { Sheet } from "../Sheet";
import Timer from "../Timer";

interface WorkoutProps {
  workout: WorkoutType;
}

export const Workout = ({ workout }: WorkoutProps) => {
  const { db } = useContext(DatabaseContext);
  const queryClient = useQueryClient();

  const sheetRef = useRef<BottomSheetModal>(null);

  const { data: exerciseRoutines, isLoading: getExerciseRoutinesLoading } = useQuery({
    queryKey: ["workout", workout.id, "exerciseRoutines"],
    queryFn: () => db.exerciseRoutines.getExerciseRoutines(workout.routineId),
  });

  const { mutate: createExercise } = useMutation({
    mutationFn: ({ workoutId, exerciseRoutineId }: { workoutId: string; exerciseRoutineId: string }) =>
      db.exercises.createExercise(workoutId, exerciseRoutineId),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["workout", workout.id],
      });
      sheetRef.current?.close();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <>
      <FlashList
        ListHeaderComponent={
          <View className="flex flex-row justify-between items-center pb-4">
            <View>
              <Text className="text-white text-3xl font-medium">{workout.routine.name}</Text>
              <Text className="text-secondary-600">{workout.exercises.length}</Text>
            </View>
            <Timer start={workout.start} />
          </View>
        }
        ListFooterComponent={
          <View className="pt-16 pb-16">
            <Button
              type="secondary"
              onPress={() => sheetRef.current?.present()}
            >
              <View className="flex flex-row justify-center self-center">
                <Text>Add Exercise</Text>
              </View>
            </Button>
          </View>
        }
        data={workout.exercises}
        renderItem={({ item: exercise }) => (
          <View className="pb-8">
            <Exercise exercise={exercise} />
          </View>
        )}
        estimatedItemSize={50}
      />

      <Sheet sheetRef={sheetRef} snapPoints={["50%"]}>
        <ScrollView className="p-4">
          <View className="pb-2">
            <Text className="text-white">Select an exercise routine</Text>
          </View>
          <View className="bg-secondary-800 rounded-2xl">
            {exerciseRoutines?.map(exerciseRoutine => (
              <TouchableOpacity
                onPress={() => createExercise({ workoutId: workout.id, exerciseRoutineId: exerciseRoutine.id })}
                className="flex flex-row justify-start p-4"
                key={exerciseRoutine.id}
              >
                <Text className="text-white text-lg ">{exerciseRoutine.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </Sheet>
    </>
  );
};
