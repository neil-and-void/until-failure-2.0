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
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <>
      <FlashList
        ListHeaderComponent={
          <View className="flex flex-row justify-between">
            <View>
              <Text className="text-white font-lg font-medium">{workout.routine.name}</Text>
              <Text className="text-white">{workout.exercises.length}</Text>
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
        renderItem={({ item: exercise }) => <Exercise exercise={exercise} />}
        estimatedItemSize={50}
      />

      <Sheet sheetRef={sheetRef}>
        <ScrollView>
          {exerciseRoutines?.map((exerciseRoutine) => (
            <TouchableOpacity
              key={exerciseRoutine.id}
              onPress={() => createExercise({ workoutId: workout.id, exerciseRoutineId: exerciseRoutine.id })}
            >
              <Text className="text-white">{exerciseRoutine.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Sheet>
    </>
  );
};
