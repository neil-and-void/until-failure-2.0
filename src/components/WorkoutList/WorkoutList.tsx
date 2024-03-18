import { Workout } from "@until-failure-app/src/types";
import React from "react";
import { Text, View } from "react-native";

interface WorkoutListProps {
  workouts?: Workout[];
  loading: boolean;
}

export const WorkoutList = ({ workouts, loading }: WorkoutListProps) => {
  return (
    <View>
      <Text>WorkoutList =</Text>
    </View>
  );
};
