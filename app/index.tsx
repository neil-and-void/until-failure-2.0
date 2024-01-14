import { SafeAreaView,StyleSheet } from "react-native";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function Index() {
  return (
      <SafeAreaView style={styles.container}>
        <SignedOut>
          <Redirect href="/auth"/>
        </SignedOut>
        <SignedIn>
          <Redirect href="/hometabs"/>
        </SignedIn>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
