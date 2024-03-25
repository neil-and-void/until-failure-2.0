import { SafeAreaView, Text, View } from "react-native";

import { Link, usePathname } from "expo-router";
import { MiniWorkoutView } from "../MiniWorkoutView/MiniWorkoutView";

export const Tabs = () => {
  const pathname = usePathname();

  return (
    <View>
      <MiniWorkoutView />

      <SafeAreaView className="flex flex-row justify-center gap-4">
        <Link href="/workouts" className="p-4">
          <Text className="text-white">workout2s</Text>
        </Link>

        <Link href="/routines" className="p-4">
          <Text className="text-white">routines</Text>
        </Link>

        <Link href="/stats" className="p-4">
          <Text className="text-white">stats</Text>
        </Link>
      </SafeAreaView>
    </View>
  );
};
