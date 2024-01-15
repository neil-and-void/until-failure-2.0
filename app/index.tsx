import { SafeAreaView, StyleSheet } from "react-native";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView className="bg-dark">
      <SignedOut>
        <Redirect href="/auth" />
      </SignedOut>
      <SignedIn>
        <Redirect href="/hometabs" />
      </SignedIn>
    </SafeAreaView>
  );
}
