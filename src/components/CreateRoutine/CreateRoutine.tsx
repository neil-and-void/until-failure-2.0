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
  });

  return (
    <View>
      <Text className="text-white">Name your routine</Text>
      <TextInput
        placeholder="routine name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Button onPress={() => createRoutineMutation({ name })}>
        <Text className="text-white">Create</Text>
      </Button>
    </View>
  );
}

export default CreateRoutine;
