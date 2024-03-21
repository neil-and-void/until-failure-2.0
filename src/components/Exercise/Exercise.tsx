import { Exercise as ExerciseType } from "@until-failure-app/src/types";
import { Text, View } from "react-native";

interface ExerciseProps {
  exercise: ExerciseType;
}

export const Exercise = ({ exercise }: ExerciseProps) => {
  return (
    <View>
      <Text className="text-white">{exercise.exerciseRoutine.name}</Text>
    </View>
  );
};
