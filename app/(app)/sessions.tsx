import { View, Text, Button } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Sessions() {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <SafeAreaView>
      <View className="py-4">
        <Text>Sessions</Text>
      </View>
    </SafeAreaView>
  );
}
