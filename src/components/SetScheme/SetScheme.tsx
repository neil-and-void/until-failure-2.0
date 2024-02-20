import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetScheme } from "@until-failure-app/src/services/set_schemes";
import { Routine, SetScheme as SetSchemeType, UpdateSetScheme } from "@until-failure-app/src/types";
import debounce from "lodash.debounce";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import TextInput from "../TextInput";

interface SetSchemeProps {
  setScheme: SetSchemeType;
  routineId: string;
}

const SetScheme = ({ setScheme, routineId }: SetSchemeProps) => {
  const queryClient = useQueryClient();

  const [targetReps, setTargetReps] = useState<string>(
    String(setScheme.targetReps),
  );

  const { mutate: updateSetSchemeMutation } = useMutation({
    mutationFn: (updatedSetScheme: UpdateSetScheme) => updateSetScheme(setScheme.id, updatedSetScheme),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["routine", routineId] }),
  });

  const debouncedUpdateSetScheme = debounce(
    (updatedSetScheme: UpdateSetScheme) => {
      updateSetSchemeMutation(updatedSetScheme);
    },
    500,
  );

  const handleChangedTargetReps = (str: string) => {
    const numStr = [];
    for (const char of str) {
      if (isNaN(parseInt(char))) continue;
      numStr.push(char);
    }

    if (numStr.length === 0) {
      setTargetReps("");
      debouncedUpdateSetScheme({ ...setScheme, targetReps: 0 });
      return;
    }

    const targetRepsStr = numStr.join("");
    const targetReps = parseInt(targetRepsStr);
    setTargetReps(targetRepsStr);
    debouncedUpdateSetScheme({ ...setScheme, targetReps });
  };

  return (
    <View className="flex flex-row">
      <View className="flex-1 pr-1">
        <TextInput
          value={targetReps}
          onChangeText={handleChangedTargetReps}
          onBlur={() => targetReps.length === 0 && handleChangedTargetReps("0")}
          keyboardType="number-pad"
        />
      </View>

      <View className="flex-1 pl-1">
        <Pressable className="text-md bg-secondary-900 p-4 border border-secondary-500 rounded-md text-white flex flex-row">
          <Text className="grow text-white text-center">
            {setScheme.setType}
          </Text>
          <View className="border-l border-red-50 grow text-white text-center">
            <Text className="text-white text-center">
              {setScheme.measurement}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default SetScheme;
