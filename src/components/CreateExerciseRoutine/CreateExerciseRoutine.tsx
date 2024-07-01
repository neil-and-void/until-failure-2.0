import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DatabaseContext } from "@until-failure-app/src/contexts/DatabaseContext";
import { NewExerciseRoutine } from "@until-failure-app/src/types";
import { useContext, useState } from "react";
import { Text, View } from "react-native";
import Button from "../Button";
import { TextInput } from "../TextInput";

type CreateExerciseRoutineProps = {
  onCreate: () => void;
};
export const CreateExerciseRoutine = (props: CreateExerciseRoutineProps) => {
  const { onCreate } = props;

  const [name, setName] = useState("");
  const [error, setError] = useState<null | string>(null);
  const { db } = useContext(DatabaseContext);

  const queryClient = useQueryClient();

  const { mutate: createExerciseRoutineMutation } = useMutation({
    mutationFn: (newExerciseRoutine: NewExerciseRoutine) =>
      db.exerciseRoutines.createExerciseRoutine(newExerciseRoutine),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["exerciseRoutines"],
      });
      onCreate();
    },
    onError: (_err) => {
      setError("could not save new exercise");
    },
  });

  const createExerciseRoutine = (name: string) => {
    if (name.length <= 0) {
      setError("Name cannot be empty");
      return;
    }
    createExerciseRoutineMutation({ name });
  };

  return (
    <View>
      <Text className="text-white pb-2">Name your exercise</Text>
      <View className="pb-8">
        <TextInput
          placeholder="exercise name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Text className="text-error">{error ? error : ""}</Text>
      </View>
      <Button onPress={() => createExerciseRoutine(name)}>
        <Text className="text-white">Create</Text>
      </Button>
    </View>
  );
};
