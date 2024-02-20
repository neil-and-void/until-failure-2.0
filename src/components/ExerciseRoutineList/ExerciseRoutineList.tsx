import { FlashList } from "@shopify/flash-list";
import { type ExerciseRoutine as ExerciseRoutineType } from "@until-failure-app/src/types";
import { Text, TextInput, View } from "react-native";
import ExerciseRoutine from "../ExerciseRoutine/ExerciseRoutine";

interface ExerciseRoutineListProps {
  routineName: string;
  exerciseRoutines: ExerciseRoutineType[];
  loading: boolean;
}

const ExerciseRoutineList = ({
  routineName,
  exerciseRoutines,
  loading,
}: ExerciseRoutineListProps) => {
  if (loading) {
    return <Text className="text-white">Skeleton</Text>;
  }

  return (
    <View className="h-full pt-2">
      <FlashList
        ListHeaderComponent={
          <TextInput
            className="text-white text-4xl font-medium px-4"
            value={routineName}
          />
        }
        data={exerciseRoutines}
        renderItem={({ item: exerciseRoutine }) => (
          <ExerciseRoutine
            name={exerciseRoutine.name}
            setSchemes={exerciseRoutine.setSchemes}
            exerciseRoutineId={exerciseRoutine.id}
            routineId={exerciseRoutine.routineId}
          />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default ExerciseRoutineList;
