import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExerciseRoutine } from "@until-failure-app/src/services/exerciseRoutines";
import { createSetScheme } from "@until-failure-app/src/services/setSchemes";
import {
  CreateSetScheme,
  ExerciseRoutine as ExerciseRoutineType,
  Routine,
  UpdateExerciseRoutine,
} from "@until-failure-app/src/types";
import clsx from "clsx";
import { useState } from "react";
import { Pressable, Text, TextInput as RNTextInput, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Button from "../Button";
import SetScheme from "../SetScheme";

interface ExerciseRoutineProps {
  exerciseRoutine: ExerciseRoutineType;
}

const ExerciseRoutine = ({ exerciseRoutine }: ExerciseRoutineProps) => {
  const queryClient = useQueryClient();
  const [exerciseName, setExerciseName] = useState(exerciseRoutine.name);

  const { mutate: createSetSchemeMutation, isPending } = useMutation({
    mutationFn: (newSetScheme: CreateSetScheme) => createSetScheme(newSetScheme),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["routine", exerciseRoutine.routineId],
      }),
  });

  const { mutate: updateExerciseRoutineMutation } = useMutation({
    mutationFn: (updatedExerciseRoutine: UpdateExerciseRoutine) =>
      updateExerciseRoutine(exerciseRoutine.id, updatedExerciseRoutine),
    onMutate: async (updatedExerciseRoutine) => {
      await queryClient.cancelQueries({
        queryKey: ["routine", exerciseRoutine.routineId],
      });

      const prevRoutine = queryClient.getQueryData([
        "routine",
        exerciseRoutine.routineId,
      ]) as Routine;

      const prevExerciseRoutine = prevRoutine.exerciseRoutines.find(
        (exerciseRoutine) => exerciseRoutine.id === exerciseRoutine.id,
      );

      if (!prevExerciseRoutine) return {};

      prevExerciseRoutine.name = updatedExerciseRoutine.name;

      queryClient.setQueryData(
        ["routine", exerciseRoutine.routineId],
        prevRoutine,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["routine", exerciseRoutine.routineId],
      });
    },
  });

  return (
    <View className="pb-6">
      <View className="pb-2 px-4">
        <RNTextInput
          value={exerciseRoutine.name}
          className="text-2xl text-white"
          onChangeText={(name) => {
            updateExerciseRoutineMutation({ name });
          }}
        />
        <Text className="text-secondary-300">
          {exerciseRoutine.setSchemes.length} set
          {exerciseRoutine.setSchemes.length === 1 ? "" : "s"}
        </Text>
      </View>

      <View className="pb-2">
        {exerciseRoutine.setSchemes.length
          ? (
            exerciseRoutine.setSchemes.map((setScheme, idx) => (
              <View
                key={setScheme.id}
                className={clsx("px-4", {
                  "pb-2": idx < exerciseRoutine.setSchemes.length - 1,
                })}
              >
                <Swipeable
                  renderRightActions={() => (
                    <Pressable className="flex flex-col justify-center px-2">
                      <Text className="text-delete">delete</Text>
                    </Pressable>
                  )}
                >
                  <View>
                    <SetScheme
                      setScheme={setScheme}
                      routineId={exerciseRoutine.routineId}
                    />
                  </View>
                </Swipeable>
              </View>
            ))
          )
          : (
            <View className="flex flex-row justify-center py-3">
              <Text className="text-white">No sets yet</Text>
            </View>
          )}
      </View>

      <View className="px-4">
        <Button
          disabled={isPending}
          onPress={() =>
            createSetSchemeMutation({
              measurement: "WEIGHT",
              setType: "WORKING",
              targetReps: 0,
              exerciseRoutineId: exerciseRoutine.id,
            })}
        >
          <View className="flex flex-row justify-center">
            <Text className="text-white">Add set</Text>
          </View>
        </Button>
      </View>
    </View>
  );
};

export default ExerciseRoutine;
