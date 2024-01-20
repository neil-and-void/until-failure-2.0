import { View, Text, Button } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <SafeAreaView className="py-4">
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </SafeAreaView>
  );
}
