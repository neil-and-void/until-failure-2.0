import { FlashList } from "@shopify/flash-list";
import { Workout } from "@until-failure-app/src/types";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, TouchableHighlight, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

interface WorkoutListItemProps {
  workout: Workout;
}

const WorkoutListItem = ({ workout }: WorkoutListItemProps) => {
  return (
    <Swipeable
      key={workout.id}
      renderRightActions={() => (
        <Pressable
          className="bg-delete h-full px-4 flex flex-col justify-center"
          onPress={() => console.log("show delet")}
        >
          <Text className="text-white">delete</Text>
        </Pressable>
      )}
    >
      <TouchableHighlight
        className="py-2 bg-black border-t border-gray-800 flex"
        onPress={() => router.push(`/workouts/${workout.id}`)}
      >
        <View>
          <Text className="text-white text-lg">{workout.routine.name}</Text>
          <Text className="text-white text-md">{workout.start.toString()}</Text>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
};

interface WorkoutListProps {
  workouts?: Workout[];
  loading: boolean;
}

export const WorkoutList = ({ workouts, loading }: WorkoutListProps) => {
  if (!workouts || workouts.length === 0) {
    return (
      <View>
        <Text>no workouts</Text>
      </View>
    );
  }

  return (
    <View className="h-full px-4">
      <FlashList
        data={workouts}
        estimatedItemSize={62}
        renderItem={({ item: workout }) => <WorkoutListItem workout={workout} />}
      />
    </View>
  );
};
