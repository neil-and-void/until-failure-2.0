import { EditSetSchemeModalContext } from "@until-failure-app/src/contexts/EditSetSchemeModalContext";
import {
  EditSetSchemeModalType,
  MeasurementType,
  SetScheme as SetSchemeType,
  UpdateSetScheme,
} from "@until-failure-app/src/types";
import debounce from "lodash.debounce";
import { useContext, useState } from "react";
import { Pressable, Text, TextInputProps, View } from "react-native";
import TextInput from "../TextInput";

interface SetSchemeWeightInputProps extends TextInputProps {
  measurementType: MeasurementType;
}

const SetSchemeWeightInput = ({
  measurementType,
  ...props
}: SetSchemeWeightInputProps) => {
  if (measurementType === "WEIGHT") {
    return <TextInput keyboardType="number-pad" {...props} />;
  } else if (measurementType === "WEIGHTED_DURATION") {
    return (
      <View className="flex flex-row">
        <TextInput keyboardType="number-pad" {...props} />
        <TextInput keyboardType="number-pad" {...props} />
      </View>
    );
  } else if (measurementType === "BODYWEIGHT") {
    return (
      <>
        <TextInput
          editable={false}
          selectTextOnFocus={false}
          placeholder="bodyweight"
          {...props}
        />
      </>
    );
  } else if (measurementType === "DURATION") {
    return (
      <>
        <TextInput keyboardType="number-pad" {...props} />
      </>
    );
  } else {
    return (
      <>
        <TextInput {...props} />
      </>
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

  const [targetReps, setTargetReps] = useState<string>(
    String(setScheme.targetReps),
  );

  const debouncedUpdateSetScheme = debounce(
    (updatedSetScheme: UpdateSetScheme) => {
      console.log(updatedSetScheme);
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

      <View className="g-1 pl-1 shrink-0 basis-1/2">
        <SetSchemeWeightInput
          value={targetReps}
          measurementType={setScheme.measurement}
          onBlur={() => targetReps.length === 0 && handleChangedTargetReps("0")}
        />
      </View>
    </View>
  );
};

export default SetScheme;
