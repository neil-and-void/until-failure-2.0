import database from "@until-failure-app/src/database";
import { useState } from "react";
import { Text, View } from "react-native";
import Button from "../Button";
import TextInput from "../TextInput";

interface CreateRoutineProps {
  onCreate: () => void;
}

function CreateRoutine({ onCreate }: CreateRoutineProps) {
  const [name, setName] = useState("");

  const createRoutine = () => {
    onCreate();
  };

  return (
    <View>
      <Text className="text-white">Name your routine</Text>
      <TextInput
        placeholder="routine name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Button onPress={createRoutine}>
        <Text className="text-white">Create</Text>
      </Button>
    </View>
  );
}

export default CreateRoutine;
