import { Routine } from "@until-failure-app/src/types";
import { router } from "expo-router";
import { Text, TouchableHighlight, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

interface RoutineListProps {
  routines: Routine[];
  loading: boolean;
}

const RoutineList = ({ routines, loading }: RoutineListProps) => {
  if (loading) {
    return <Text className="text-white">Skeleton</Text>;
  }

  return (
    <SwipeListView
      className="h-full pl-4"
      data={routines}
      renderItem={(data) => (
        <TouchableHighlight
          className="py-2 bg-black border-t border-gray-800 flex"
          onPress={() => router.push(`/routines/${data.item.id}`)}
        >
          <View>
            <Text className="text-white text-lg">{data.item.name}</Text>
            <Text className="text-white text-md text-secondary-400">
              5 exercises
            </Text>
          </View>
        </TouchableHighlight>
      )}
      renderHiddenItem={() => (
        <View className="bg-red-400 self-end w-[75px]">
          <Text className="text-white self-center">Delete</Text>
        </View>
      )}
      rightOpenValue={-75}
    />
  );
};

export default RoutineList;
