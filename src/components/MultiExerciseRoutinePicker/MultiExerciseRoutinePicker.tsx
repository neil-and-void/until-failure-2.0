import { FlashList } from "@shopify/flash-list";
import { ExerciseRoutine } from "@until-failure-app/src/types";
import React, { useCallback, useMemo } from "react";
import { Pressable, Text, View } from "react-native";

type SelectableExerciseRoutineItem = {
  selected: boolean;
  exerciseRoutine: ExerciseRoutine;
};

type MultiExerciseRoutineListPickerProps = {
  exerciseRoutines: ExerciseRoutine[];
  selectedExerciseRoutines: ExerciseRoutine[];
  onPressSelected: (exerciseRoutineId: string) => void;
  onPressUnselected: (exerciseRoutineId: string) => void;
};

export const MultiExerciseRoutineListPicker = (props: MultiExerciseRoutineListPickerProps) => {
  const { selectedExerciseRoutines, exerciseRoutines, onPressUnselected, onPressSelected } = props;

  const exerciseRoutineItems = useMemo<SelectableExerciseRoutineItem[]>(() => {
    const selectedExerciseRoutinesSet = new Set(selectedExerciseRoutines.map(exerciseRoutine => exerciseRoutine.id));

    const dedupedExerciseRoutinesList = exerciseRoutines.filter((exerciseRoutine) =>
      !selectedExerciseRoutinesSet.has(exerciseRoutine.id)
    );

    return dedupedExerciseRoutinesList.map((exerciseRoutine) => ({
      selected: false,
      exerciseRoutine,
    }));
  }, [exerciseRoutines, selectedExerciseRoutines]);

  const selectedExerciseRoutineItems = useMemo<SelectableExerciseRoutineItem[]>(() => {
    return selectedExerciseRoutines.map((exerciseRoutine) => ({
      selected: true,
      exerciseRoutine,
    }));
  }, [selectedExerciseRoutines, exerciseRoutines]);

  const handleItemPress = useCallback((exerciseRoutineId: string, selected: boolean) => {
    if (selected) onPressSelected(exerciseRoutineId);
    else {
      onPressUnselected(exerciseRoutineId);
    }
  }, []);

  return (
    <View className="w-full h-full">
      <FlashList
        data={[...selectedExerciseRoutineItems, ...exerciseRoutineItems]}
        estimatedItemSize={62}
        renderItem={({ item: exerciseRoutineItem }) => (
          <Pressable
            className="flex flex-row justify-between py-3"
            onPress={() => handleItemPress(exerciseRoutineItem.exerciseRoutine.id, exerciseRoutineItem.selected)}
          >
            <Text className="text-white">{exerciseRoutineItem.exerciseRoutine.name}</Text>
            <Text className="text-white">{exerciseRoutineItem.selected ? "x" : ""}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};
