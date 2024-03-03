import { FlashList } from "@shopify/flash-list";
import { Routine } from "@until-failure-app/src/types";
import { Image, Text, TextInput, View } from "react-native";
import ExerciseRoutine from "../ExerciseRoutine/ExerciseRoutine";

interface ExerciseRoutineListProps {
  routine?: Routine;
  loading: boolean;
}

const ExerciseRoutineList = ({
  routine,
  loading,
}: ExerciseRoutineListProps) => {
  if (loading) {
    return <Text className="text-white">Skeleton</Text>;
  }

  if (!routine) {
    return <Text className="text-white">Skeleton</Text>;
  }

  return (
    <View className="h-full pt-2">
      <FlashList
        ListHeaderComponent={
          <View>
            <View className="p-10 justify-center flex flex-col items-center">
              <Image
                src="https://preview.redd.it/standing-appa-appreciation-post-v0-dyfo9w0pzawa1.png?auto=webp&s=3e39c2dcac1232c69263107afbd6ab217dbb19bc"
                className="w-2/3 aspect-square object-cover"
              />
            </View>
            <TextInput
              className="text-white text-4xl font-medium px-4"
              value={routine.name}
            />
          </View>
        }
        data={routine.exerciseRoutines}
        renderItem={({ item: exerciseRoutine }) => <ExerciseRoutine exerciseRoutine={exerciseRoutine} />}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default ExerciseRoutineList;
