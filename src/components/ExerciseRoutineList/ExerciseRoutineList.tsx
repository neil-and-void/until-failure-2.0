import { FlashList } from "@shopify/flash-list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DatabaseContext } from "@until-failure-app/src/contexts/DatabaseContext";
import { NewExerciseRoutine, Routine, UpdateRoutine } from "@until-failure-app/src/types";
import debounce from "lodash.debounce";
import { useCallback, useContext, useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import Button from "../Button/Button";
import ExerciseRoutine from "../ExerciseRoutine/ExerciseRoutine";

interface ExerciseRoutineListProps {
  routine: Routine;
  loading: boolean;
}

const ExerciseRoutineList = ({
  routine,
  loading,
}: ExerciseRoutineListProps) => {
  const queryClient = useQueryClient();
  const { db } = useContext(DatabaseContext);
  const [name, setName] = useState(routine.name);

  const { mutate: createExerciseRoutine } = useMutation({
    mutationFn: (newExerciseRoutine: NewExerciseRoutine) =>
      db.exerciseRoutines.createExerciseRoutine(newExerciseRoutine),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["routine", routine.id],
      });
    },
  });

  const { mutate: updateRoutineMutation } = useMutation({
    mutationFn: (updatedRoutine: UpdateRoutine) => db.routines.updateRoutine(updatedRoutine),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["routines"],
      });
      queryClient.invalidateQueries({
        queryKey: ["routine", routine.id],
      });
    },
  });

  const debouncedUpdateRoutine = useCallback(
    debounce((updatedRoutine: UpdateRoutine) => {
      updateRoutineMutation(updatedRoutine);
    }, 500),
    [],
  );

  const updateRoutine = (name: string) => {
    setName(name);
    debouncedUpdateRoutine({ name, id: routine.id });
  };

  if (loading) {
    return <Text className="text-white">Skeleton</Text>;
  }

  if (!routine) {
    return <Text className="text-white">no routine found :\</Text>;
  }

  return (
    <View className="h-full pt-2">
      <FlashList
        data={routine.exerciseRoutines}
        renderItem={({ item: exerciseRoutine }) => (
          <ExerciseRoutine key={exerciseRoutine.id} exerciseRoutine={exerciseRoutine} />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default ExerciseRoutineList;
