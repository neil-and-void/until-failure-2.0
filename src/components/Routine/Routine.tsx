import { Routine as RoutineType } from "@until-failure-app/src/types";
import React from "react";
import { Text, View } from "react-native";
import ExerciseRoutineList from "../ExerciseRoutineList";

interface RoutineProps {
  routine?: RoutineType;
  loading: boolean;
}

export const Routine = ({ routine, loading }: RoutineProps) => {
  if (!routine) {
    return (
      <View>
        <Text>Could not find routine</Text>
      </View>
    );
  }

  return <ExerciseRoutineList routine={routine} loading={loading} canEdit={false} />;
};
