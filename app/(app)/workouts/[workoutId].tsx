import { useQuery } from "@tanstack/react-query";
import { Workout } from "@until-failure-app/src/components/Workout";
import { DatabaseContext } from "@until-failure-app/src/contexts/DatabaseContext";
import { Stack, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { Text, View } from "react-native";

export default function ViewWorkout() {
  const { workoutId } = useLocalSearchParams();
  const { db } = useContext(DatabaseContext);

  const { data: workout, isLoading: workoutLoading } = useQuery({
    queryKey: ["workout", workoutId],
    queryFn: () => db.workouts.getWorkout(workoutId as string),
  });

  if (workoutLoading) {
    return (
      <View className="justify-center">
        <Text className="text-white">loading</Text>
      </View>
    );
  }

  if (!workout) {
    return (
      <View className="justify-center">
        <Text className="text-white">No workout found</Text>
      </View>
    );
  }

  return (
    <View className="px-4 w-full">
      <Stack.Screen
        options={{
          headerBackTitle: "workouts",
          title: workout.routine.name,
        }}
      />

      <Workout workout={workout} />
    </View>
  );
}
