import { useQuery } from "@tanstack/react-query";
import { getRoutines } from "@until-failure-app/src/services/routines";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Workouts() {
  return (
    <SafeAreaView className="px-4">
      <Text className="text-white text-4xl">Workouts</Text>
    </SafeAreaView>
  );
}
