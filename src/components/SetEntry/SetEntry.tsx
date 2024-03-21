import { MeasurementType, SetEntry as SetEntryType } from "@until-failure-app/src/types";
import { Text, View } from "react-native";
import { TextInput } from "../TextInput";

interface SetEntryProps {
  setEntry: SetEntryType;
}

const WeightSetEntry = ({ setEntry }: SetEntryProps) => {
  return <View></View>;
};
const DurationSetEntry = () => {
  return <View></View>;
};
const BodyweightSetEntry = () => {
  return <View></View>;
};
const CounterWeightSetEntry = () => {
  return <View></View>;
};

export const SetEntry = ({ setEntry }: SetEntryProps) => {
  return (
    <View>
      <TextInput placeholder="hidsf" />
    </View>
  );
  // switch (setEntry.measurement) {
  //   case MeasurementType.weight:
  //     return <WeightSetEntry setEntry={setEntry} />;
  //
  //   case MeasurementType.duration:
  //
  //   case MeasurementType.weightedDuration:
  //
  //   case MeasurementType.bodyweight:
  //
  //   case MeasurementType.counterweight:
  //     return
  //   default
  // }
};
