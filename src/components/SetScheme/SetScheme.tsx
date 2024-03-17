import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DatabaseContext } from "@until-failure-app/src/contexts/DatabaseContext";
import { EditSetSchemeModalContext } from "@until-failure-app/src/contexts/EditSetSchemeModalContext";
import {
  EditSetSchemeModalType,
  MeasurementType,
  SetScheme as SetSchemeType,
  UpdateSetScheme,
} from "@until-failure-app/src/types";
import debounce from "lodash.debounce";
import { useCallback, useContext, useState } from "react";
import { Pressable, Text, TextInputProps, View } from "react-native";
import TextInput from "../TextInput";

interface SetSchemeWeightInputProps extends TextInputProps {
  measurementType: MeasurementType;
}

const SetSchemeTextFields = ({
  measurementType,
  ...props
}: SetSchemeWeightInputProps) => {
  if (measurementType === "WEIGHT") {
    return (
      <View className="basis-1/2 px-1 shrink-0">
        <TextInput placeholder="reps" keyboardType="number-pad" {...props} />
      </View>
    );
  } else if (measurementType === "WEIGHTED_DURATION") {
    return (
      <>
        <View className="basis-1/5 px-1 shrink-0">
          <TextInput placeholder="seconds" keyboardType="number-pad" {...props} />
        </View>
        <View className="basis-1/4 px-1 shrink-0">
          <TextInput placeholder="reps" keyboardType="number-pad" {...props} />
        </View>
      </>
    );
  } else if (measurementType === "BODYWEIGHT") {
    return (
      <View className="basis-1/2 px-1 shrink-0">
        <TextInput
          editable={false}
          selectTextOnFocus={false}
          placeholder="reps"
          {...props}
        />
      </View>
    );
  } else if (measurementType === "DURATION") {
    return (
      <View className="basis-1/2 px-1 shrink-0">
        <TextInput placeholder="seconds" keyboardType="number-pad" {...props} />
      </View>
    );
  } else {
    return (
      <View className="basis-1/2 px-1 shrink-0">
        <TextInput {...props} />
      </View>
    );
  }
};

interface SetSchemeProps {
  setScheme: SetSchemeType;
  routineId: string;
}

const SetScheme = ({ setScheme, routineId }: SetSchemeProps) => {
  const { editSetSchemeModalState, setEditSetSchemeModalState } = useContext(
    EditSetSchemeModalContext,
  );

  const { db } = useContext(DatabaseContext);

  const queryClient = useQueryClient();

  const { mutate: updateSetSchemeMutation } = useMutation({
    mutationFn: (updatedSetScheme: UpdateSetScheme) => db.setSchemes.updateSetScheme(updatedSetScheme),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["routine", routineId],
      });
    },
    onError: (err) => {
      // todo
      console.log(err);
    },
  });

  const [targetReps, setTargetReps] = useState<string>(
    String(setScheme.targetReps ?? ""),
  );

  const debouncedUpdateSetScheme = useCallback(
    debounce(
      (updatedSetScheme: UpdateSetScheme) => {
        updateSetSchemeMutation(updatedSetScheme);
      },
      500,
    ),
    [],
  );

  const handleChangedTargetReps = (str: string) => {
    const numStr = [];
    for (const char of str) {
      if (isNaN(parseInt(char))) continue;
      numStr.push(char);
    }

    if (numStr.length === 0) {
      setTargetReps("");
      debouncedUpdateSetScheme({ ...setScheme, targetReps: null });
      return;
    }

    const targetRepsStr = numStr.join("");
    const targetReps = parseInt(targetRepsStr);
    setTargetReps(targetRepsStr);
    debouncedUpdateSetScheme({ ...setScheme, targetReps });
  };

  return (
    <View className="flex flex-row">
      <View className="basis-1/4 pr-1 shrink-0">
        <Pressable
          className="text-md bg-secondary-900 p-4 border border-secondary-500 rounded-md text-white flex flex-row"
          onPress={() =>
            setEditSetSchemeModalState({
              ...editSetSchemeModalState,
              isOpen: true,
              type: EditSetSchemeModalType.setType,
              setScheme,
            })}
        >
          <Text
            className="text-white text-center"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {setScheme.setType}
          </Text>
        </Pressable>
      </View>

      <View className="basis-1/4 px-1 shrink-0">
        <Pressable
          className="text-md bg-secondary-900 p-4 border border-secondary-500 rounded-md text-white flex flex-row"
          onPress={() =>
            setEditSetSchemeModalState({
              ...editSetSchemeModalState,
              isOpen: true,
              type: EditSetSchemeModalType.measurementType,
              setScheme,
            })}
        >
          <Text
            className="text-white text-center"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {setScheme.measurement}
          </Text>
        </Pressable>
      </View>

      <SetSchemeTextFields
        value={targetReps}
        measurementType={setScheme.measurement}
        onBlur={() => targetReps.length === 0 && handleChangedTargetReps("")}
        onChangeText={(text) => handleChangedTargetReps(text)}
      />
    </View>
  );
};

export default SetScheme;
