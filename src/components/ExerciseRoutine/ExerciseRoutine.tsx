import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DatabaseContext } from "@until-failure-app/src/contexts/DatabaseContext";
import { exerciseRoutines } from "@until-failure-app/src/database/schema";
import {
  ExerciseRoutine as ExerciseRoutineType,
  NewSetScheme,
  UpdateExerciseRoutine,
} from "@until-failure-app/src/types";
import clsx from "clsx";
import debounce from "lodash.debounce";
import { useCallback, useContext, useState } from "react";
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

  const { mutate: deleteSetScheme } = useMutation({
    mutationFn: (id: string) => db.setSchemes.deleteSetScheme(id),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["routine", exerciseRoutine.routineId],
      });
    },
    onError: (err) => {
      // todo
      console.log(err);
    },
  });

  const { mutate: updateExerciseRoutineMutation } = useMutation({
    mutationFn: (updatedExerciseRoutine: UpdateExerciseRoutine) =>
      db.exerciseRoutines.updateExerciseRoutine(updatedExerciseRoutine),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["routine", exerciseRoutine.routineId],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: createSetSchemeMutation } = useMutation({
    mutationFn: (newSetScheme: NewSetScheme) => db.setSchemes.createSetScheme(newSetScheme),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["routine", exerciseRoutine.routineId],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const debouncedUpdateExerciseRoutine = useCallback(
    debounce((updatedExerciseRoutine: UpdateExerciseRoutine) => {
      updateExerciseRoutineMutation(updatedExerciseRoutine);
    }, 500),
    [],
  );

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
                    <Pressable
                      className="flex flex-col justify-center px-2"
                      onPress={() => deleteSetScheme(setScheme.id)}
                    >
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
          disabled={false}
          onPress={() =>
            createSetSchemeMutation({
              measurement: "WEIGHT",
              setType: "WORKING",
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
