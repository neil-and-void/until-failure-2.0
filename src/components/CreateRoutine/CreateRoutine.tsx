import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DatabaseContext } from "@until-failure-app/src/contexts/DatabaseContext";
import { CreateRoutine as CreateRoutineType } from "@until-failure-app/src/types";
import { useContext, useState } from "react";
import { Text, View } from "react-native";
import Button from "../Button";
import TextInput from "../TextInput";

interface CreateRoutineProps {
  onCreate: () => void;
}

function CreateRoutine({ onCreate }: CreateRoutineProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState<null | string>(null);
  const { db } = useContext(DatabaseContext);

  const queryClient = useQueryClient();

  const { mutate: createRoutineMutation } = useMutation({
    mutationFn: (newRoutine: CreateRoutineType) => db.routines.createRoutine(newRoutine),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["routines"],
      });
      onCreate();
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const createRoutine = (name: string) => {
    console.log(name);
    if (name.length <= 0) {
      setError("Name cannot be empty");
      return;
    }
    createRoutineMutation({ name });
  };

  return (
    <View>
      <Text className="text-white pb-2">Name your routine</Text>
      <View className="pb-8">
        <TextInput
          placeholder="routine name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Text className="text-error">{error ? error : ""}</Text>
      </View>
      <Button onPress={() => createRoutine(name)}>
        <Text className="text-white">Create</Text>
      </Button>
    </View>
  );
}

export default CreateRoutine;
