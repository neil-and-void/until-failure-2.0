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
    return <Text className="text-white">Skeleton</Text>;
  }

  return (
    <View className="h-full pt-2">
      <FlashList
        ListHeaderComponent={
          <View>
            <View className="p-10 justify-center flex flex-col items-center">
              <Image
                src="https://preview.redd.it/standing-appa-appreciation-post-v0-dyfo9w0pzawa1.png?auto=webp&s=3e39c2dcac1232c69263107afbd6ab217dbb19bc"
                className="w-2/3 aspect-square object-cover"
              />
            </View>
            <TextInput
              className="text-white text-4xl font-medium px-4"
              value={name}
              onChangeText={(name) => updateRoutine(name)}
            />
          </View>
        }
        ListFooterComponent={
          <View className="pt-16 pb-16">
            <Button
              type="secondary"
              onPress={() =>
                createExerciseRoutine({
                  name: `Exercise Routine #${routine.exerciseRoutines.length || 1}`,
                  routineId: routine.id,
                })}
            >
              <View className="flex flex-row justify-center self-center">
                <Text>Add Exercise</Text>
              </View>
            </Button>
          </View>
        }
        data={routine.exerciseRoutines}
        renderItem={({ item: exerciseRoutine }) => <ExerciseRoutine exerciseRoutine={exerciseRoutine} />}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default ExerciseRoutineList;
