import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Stats() {
  return (
    <SafeAreaView className="px-4">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Text className="text-white text-4xl">Stats</Text>
    </SafeAreaView>
  );
}
