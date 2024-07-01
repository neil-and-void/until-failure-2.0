import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DatabaseContext } from "@until-failure-app/src/contexts/DatabaseContext";
import { ExerciseRoutine } from "@until-failure-app/src/types";
import { router } from "expo-router";
import throttle from "lodash.throttle";
import { useCallback, useContext, useRef } from "react";
import { Pressable, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Sheet } from "../Sheet";

interface ExerciseLibraryListItemProps {
  exerciseRoutine: ExerciseRoutine;
}

const ExerciseRoutineListItem = ({ exerciseRoutine }: ExerciseLibraryListItemProps) => {
  const { db } = useContext(DatabaseContext);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const queryClient = useQueryClient();

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const { mutate: deleteExerciseRoutine } = useMutation({
    mutationFn: (id: string) => db.exerciseRoutines.deleteExerciseRoutine(id),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["exerciseRoutines"],
      });
    },
    onError: (err) => {
      // todo
      console.log(err);
    },
    onSuccess: () => {
      bottomSheetModalRef.current?.close();
    },
  });

  return (
    <>
      <Swipeable
        key={exerciseRoutine.id}
        renderRightActions={() => (
          <Pressable
            className="bg-delete h-full px-4 flex flex-col justify-center"
            onPress={handlePresentModalPress}
          >
            <Text className="text-white">delete</Text>
          </Pressable>
        )}
      >
        <TouchableHighlight
          className="py-2 bg-black border-t border-gray-800 flex"
          onPress={throttle(() => router.push(`/library/exerciseRoutines/${exerciseRoutine.id}`), 250)}
        >
          <View>
            <Text className="text-white text-lg">{exerciseRoutine.name}</Text>
            <Text className="text-white text-md">5 sets</Text>
          </View>
        </TouchableHighlight>
      </Swipeable>

      <Sheet sheetRef={bottomSheetModalRef} snapPoints={["25%"]}>
        <View className="p-4 gap-2">
          <View className=" bg-secondary-800 rounded-2xl">
            <TouchableOpacity className="flex flex-row justify-center p-4">
              <Text className="text-white text-md font-medium">Move to inactive</Text>
            </TouchableOpacity>
          </View>

          <View className=" bg-secondary-800 rounded-2xl">
            <TouchableOpacity
              className="flex flex-row justify-center p-4"
              onPress={() => {
                deleteExerciseRoutine(exerciseRoutine.id);
              }}
            >
              <Text className="text-error text-md font-medium">delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Sheet>
    </>
  );
};

type ExerciseLibraryProps = {
  exerciseRoutines: ExerciseRoutine[];
  loading: boolean;
};

export const ExerciseLibrary = (props: ExerciseLibraryProps) => {
  const { exerciseRoutines, loading } = props;

  if (loading) {
    return <Text className="text-white">Loading</Text>;
  }

  if (exerciseRoutines.length === 0) {
    return <Text className="text-white">no exercises found</Text>;
  }

  return (
    <View className="h-full px-4">
      <FlashList
        data={exerciseRoutines}
        estimatedItemSize={62}
        renderItem={({ item: exerciseRoutine }) => <ExerciseRoutineListItem exerciseRoutine={exerciseRoutine} />}
      />
    </View>
  );
};
