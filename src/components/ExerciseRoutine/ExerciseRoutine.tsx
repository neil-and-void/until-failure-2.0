import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DatabaseContext } from "@until-failure-app/src/contexts/DatabaseContext";
import {
  ExerciseRoutine as ExerciseRoutineType,
  MeasurementType,
  NewSetScheme,
  SetType,
  UpdateExerciseRoutine,
} from "@until-failure-app/src/types";
import clsx from "clsx";
import debounce from "lodash.debounce";
import { useCallback, useContext, useRef, useState } from "react";
import { Button as RNButton, Pressable, Text, TextInput as RNTextInput, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Button from "../Button";
import SetScheme from "../SetScheme";
import { Sheet } from "../Sheet";

type ExerciseRoutineProps = {
  exerciseRoutine: ExerciseRoutineType;
};

const ExerciseRoutine = ({ exerciseRoutine }: ExerciseRoutineProps) => {
  const { db } = useContext(DatabaseContext);
  const queryClient = useQueryClient();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [name, setName] = useState(exerciseRoutine.name);

  const { mutate: deleteSetScheme } = useMutation({
    mutationFn: (id: string) => db.setSchemes.deleteSetScheme(id),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["exerciseRoutine", exerciseRoutine.id],
      });
    },
    onError: (err) => {
      // todo
      console.log(err, exerciseRoutine);
    },
  });

  const { mutate: deleteExerciseRoutine } = useMutation({
    mutationFn: (id: string) => db.exerciseRoutines.deleteExerciseRoutine(id),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["exerciseRoutine", exerciseRoutine.id],
      });
    },
    onError: (err) => {
      // todo
      console.log(err);
    },
    onSuccess: () => {
      bottomSheetModalRef.current?.close();
    },
  });

  const { mutate: updateExerciseRoutineMutation } = useMutation({
    mutationFn: (updatedExerciseRoutine: UpdateExerciseRoutine) =>
      db.exerciseRoutines.updateExerciseRoutine(updatedExerciseRoutine),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["exerciseRoutine", exerciseRoutine.id],
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
        queryKey: ["exerciseRoutine", exerciseRoutine.id],
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

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <View className="pb-6">
      <View className="flex flex-row items-center justify-between px-4">
        <View>
          <RNTextInput
            value={name}
            className="text-2xl text-white flex-1"
            onChangeText={(name) => {
              updateExerciseRoutine(name);
            }}
          />
          <Text className="text-secondary-300">
            {exerciseRoutine.setSchemes.length} set
            {exerciseRoutine.setSchemes.length === 1 ? "" : "s"}
          </Text>
        </View>
        <RNButton title="options" onPress={() => handlePresentModalPress()} />
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
                      exerciseRoutineId={exerciseRoutine.id}
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
              measurement: MeasurementType.weight,
              setType: SetType.working,
              exerciseRoutineId: exerciseRoutine.id,
            })}
        >
          <View className="flex flex-row justify-center">
            <Text className="text-white">Add set</Text>
          </View>
        </Button>
      </View>

      <Sheet sheetRef={bottomSheetModalRef} snapPoints={["25%"]}>
        <View className="p-4 gap-2">
          <View className=" bg-secondary-800 rounded-2xl">
            <TouchableOpacity className="flex flex-row justify-center p-4">
              <Text className="text-white text-md font-medium">Move to inactive</Text>
            </TouchableOpacity>
          </View>

          <View className=" bg-secondary-800 rounded-2xl">
            <TouchableOpacity
              className="flex flex-row justify-center p-4"
              onPress={() => {
                deleteExerciseRoutine(exerciseRoutine.id);
              }}
            >
              <Text className="text-error text-md font-medium">delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Sheet>
    </View>
  );
};

export default ExerciseRoutine;
