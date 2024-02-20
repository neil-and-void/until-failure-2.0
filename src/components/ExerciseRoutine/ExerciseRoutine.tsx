import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSetScheme, updateSetScheme } from "@until-failure-app/src/services/set_schemes";
import { CreateSetScheme, type SetScheme as SetSchemeType, UpdateSetScheme } from "@until-failure-app/src/types";
import clsx from "clsx";
import { Text, TextInput as RNTextInput, View } from "react-native";
import Button from "../Button";
import SetScheme from "../SetScheme";

interface ExerciseRoutineProps {
  name: string;
  setSchemes: SetSchemeType[];
  exerciseRoutineId: string;
  routineId: string;
}

const ExerciseRoutine = ({
  name,
  setSchemes,
  exerciseRoutineId,
  routineId,
}: ExerciseRoutineProps) => {
  const queryClient = useQueryClient();

  const { mutate: createSetSchemeMutation, isPending } = useMutation({
    mutationFn: (newSetScheme: CreateSetScheme) => createSetScheme(newSetScheme),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["routine", routineId] }),
  });

  return (
    <View className="pb-6">
      <View className="pb-2 px-4">
        <RNTextInput value={name} className="text-2xl text-white" />
        <Text className="text-secondary-300">
          {setSchemes.length} set{setSchemes.length === 1 ? "" : "s"}
        </Text>
      </View>

      <View className="pb-2">
        {setSchemes.length
          ? (
            setSchemes.map((setScheme, idx) => (
              <View
                className={clsx("px-4", { "pb-2": idx < setSchemes.length - 1 })}
                key={setScheme.id}
              >
                <SetScheme setScheme={setScheme} routineId={routineId} />
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
              exerciseRoutineId,
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
