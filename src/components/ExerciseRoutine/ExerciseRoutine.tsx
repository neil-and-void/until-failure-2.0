import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DatabaseContext } from "@until-failure-app/src/contexts/DatabaseContext";
import { ExerciseRoutine as ExerciseRoutineType, UpdateExerciseRoutine } from "@until-failure-app/src/types";
import clsx from "clsx";
import debounce from "lodash.debounce";
import { useContext, useState } from "react";
import { Pressable, Text, TextInput as RNTextInput, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Button from "../Button";
import SetScheme from "../SetScheme";

interface ExerciseRoutineProps {
  exerciseRoutine: ExerciseRoutineType;
}

const ExerciseRoutine = ({ exerciseRoutine }: ExerciseRoutineProps) => {
  const { db } = useContext(DatabaseContext);
  const queryClient = useQueryClient();
  const [name, setName] = useState(exerciseRoutine.name);

  const { mutate: updateExerciseRoutineMutation } = useMutation({
    mutationFn: (updatedExerciseRoutine: UpdateExerciseRoutine) =>
      db.exerciseRoutines.updateExerciseRoutine(updatedExerciseRoutine),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["routine", exerciseRoutine.routineId],
      });
    },
  });

  const debouncedUpdateExerciseRoutine = debounce((updatedExerciseRoutine: UpdateExerciseRoutine) => {
    updateExerciseRoutineMutation(updatedExerciseRoutine);
  }, 500);

  const updateExerciseRoutine = (name: string) => {
    setName(name);
    debouncedUpdateExerciseRoutine({ name, id: exerciseRoutine.id });
  };

  return (
    <View className="pb-6">
      <View className="pb-2 px-4">
        <RNTextInput
          value={name}
          className="text-2xl text-white"
          onChangeText={(name) => {
            updateExerciseRoutine(name);
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
        <Button disabled={false} onPress={() => console.log("hi")}>
          <View className="flex flex-row justify-center">
            <Text className="text-white">Add set</Text>
          </View>
        </Button>
      </View>
    </View>
  );
};

export default ExerciseRoutine;
