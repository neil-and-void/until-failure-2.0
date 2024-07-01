import { FlashList } from "@shopify/flash-list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DatabaseContext } from "@until-failure-app/src/contexts/DatabaseContext";
import { Routine, UpdateRoutine } from "@until-failure-app/src/types";
import debounce from "lodash.debounce";
import { useCallback, useContext, useState } from "react";
import { Text, TextInput, View } from "react-native";
import ExerciseRoutine from "../ExerciseRoutine/ExerciseRoutine";

interface ExerciseRoutineListProps {
  routine: Routine;
  loading: boolean;
  canEdit?: boolean;
}

const ExerciseRoutineList = ({
  routine,
  loading,
  canEdit = true,
}: ExerciseRoutineListProps) => {
  const queryClient = useQueryClient();
  const { db } = useContext(DatabaseContext);
  const [name, setName] = useState(routine.name);

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

  return (
    <View className="h-full pt-2">
      <FlashList
        ListEmptyComponent={
          <View className="flex flex-row justify-center">
            <Text className="text-white">no exercise routines</Text>
          </View>
        }
        ListHeaderComponent={
          <View>
            <TextInput
              className="text-white text-4xl font-medium px-4"
              value={name}
              onChangeText={(name) => updateRoutine(name)}
            />
          </View>
        }
        data={routine.exerciseRoutines}
        renderItem={({ item: exerciseRoutine }) => (
          <ExerciseRoutine key={exerciseRoutine.id} exerciseRoutine={exerciseRoutine} canEdit={canEdit} />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default ExerciseRoutineList;
