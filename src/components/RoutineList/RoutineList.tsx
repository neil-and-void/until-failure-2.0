import { FlashList } from "@shopify/flash-list";
import { Routine } from "@until-failure-app/src/types";
import { router } from "expo-router";
import { Pressable, Text, TouchableHighlight, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

interface RoutineListProps {
  routines: Routine[];
  loading: boolean;
}

const RoutineList = ({ routines, loading }: RoutineListProps) => {
  if (loading) {
    return <Text className="text-white">Skeleton</Text>;
  }

  if (routines.length === 0) {
    return (
      <View>
        <Text>No routines</Text>
      </View>
    );
  }

  return (
    <View className="h-full px-4">
      <FlashList
        data={routines}
        estimatedItemSize={62}
        renderItem={({ item: routine }) => (
          <Swipeable
            key={routine.id}
            renderRightActions={() => (
              <Pressable className="bg-delete h-full px-4 flex flex-col justify-center">
                <Text className="text-white">delete</Text>
              </Pressable>
            )}
          >
            <TouchableHighlight
              className="py-2 bg-black border-t border-gray-800 flex"
              onPress={() => router.push(`/routines/${routine.id}`)}
            >
              <View>
                <Text className="text-white text-lg">{routine.name}</Text>
                <Text className="text-white text-md">5 exercises</Text>
              </View>
            </TouchableHighlight>
          </Swipeable>
        )}
      />
    </View>
  );
};

export default RoutineList;
