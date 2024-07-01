import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DatabaseContext } from "@until-failure-app/src/contexts/DatabaseContext";
import { ExerciseRoutine } from "@until-failure-app/src/types";
import Fuse from "fuse.js";
import { useContext, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { MultiExerciseRoutineListPicker } from "../MultiExerciseRoutinePicker/MultiExerciseRoutinePicker";
import { TextInput } from "../TextInput";

type AddExerciseRoutine = {
  routineId: string;
  exerciseRoutineId: string;
};

type RemoveExerciseRoutine = {
  routineId: string;
  exerciseRoutineId: string;
};

type PickExerciseRoutinesProps = {
  selectedExerciseRoutines: ExerciseRoutine[];
  onCancelPress: () => void;
  routineId: string;
};

export const PickExerciseRoutines = (props: PickExerciseRoutinesProps) => {
  const { onCancelPress, selectedExerciseRoutines, routineId } = props;

  const { db } = useContext(DatabaseContext);
  const [searchText, setSearchText] = useState("");
  const [exerciseRoutinesSearchResults, setExerciseRoutineSearchResults] = useState<ExerciseRoutine[]>([]);

  const queryClient = useQueryClient();

  const { data: allExerciseRoutines } = useQuery({
    queryKey: ["searchExerciseRoutines"],
    queryFn: () => db.exerciseRoutines.getAllExerciseRoutines(),
  });

  const { mutate: removeExerciseRoutine } = useMutation({
    mutationFn: (removeExerciseRoutine: RemoveExerciseRoutine) =>
      db.routines.addExerciseRoutine(removeExerciseRoutine.routineId, removeExerciseRoutine.exerciseRoutineId),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["searchExerciseRoutines"], // TODO: bust cache for routines
      });

      queryClient.invalidateQueries({
        queryKey: ["routine", routineId],
      });
    },
    onError: (err) => {
      console.log(err); // todo
    },
  });

  const { mutate: addExerciseRoutine } = useMutation({
    mutationFn: (addExerciseRoutine: AddExerciseRoutine) =>
      db.routines.addExerciseRoutine(addExerciseRoutine.routineId, addExerciseRoutine.exerciseRoutineId),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["searchExerciseRoutines"],
      });

      queryClient.invalidateQueries({
        queryKey: ["routine", routineId],
      });
    },
    onError: (err) => {
      console.log(err); // todo
    },
  });

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
    const results = fuse.search(text);
    setExerciseRoutineSearchResults(results.map(result => result.item));
  };

  const fuse = useMemo(() => {
    return new Fuse(allExerciseRoutines || [], {
      keys: ["name"],
    });
  }, [allExerciseRoutines]);

  const handleSelectedExerciseRoutinePress = (exerciseRoutineId: string) => {
    removeExerciseRoutine({ routineId, exerciseRoutineId });
  };

  const handleUnselectedExerciseRoutinePress = (exerciseRoutineId: string) => {
    addExerciseRoutine({ routineId, exerciseRoutineId });
  };

  return (
    <View className="px-4">
      <View className="flex-row gap-2 items-center pb-2">
        <View className="grow">
          <TextInput placeholder="search" className="py-2" onChangeText={handleSearchTextChange} value={searchText} />
        </View>
        <Pressable onPress={onCancelPress} className="justify-center items-center bg-red">
          <Text className="p-2 text-white font-semibold">Done</Text>
        </Pressable>
      </View>

      <MultiExerciseRoutineListPicker
        selectedExerciseRoutines={selectedExerciseRoutines}
        exerciseRoutines={exerciseRoutinesSearchResults.length
          ? exerciseRoutinesSearchResults
          : allExerciseRoutines || []}
        onPressSelected={handleSelectedExerciseRoutinePress}
        onPressUnselected={handleUnselectedExerciseRoutinePress}
      />
    </View>
  );
};
