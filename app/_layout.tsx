import { Stack } from "expo-router";

import { ClerkProvider } from "@clerk/clerk-expo";
import Constants from "expo-constants";

export default function AppLayout() {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig.extra.clerkPublishableKey}
    >
      <Stack className="bg-dark">
        <Stack.Screen
          name="hometabs"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ClerkProvider>
  );
}
