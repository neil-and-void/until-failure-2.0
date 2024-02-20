import { Redirect, Tabs } from "expo-router";
import { Text } from "react-native";

import { useAuth } from "@clerk/clerk-expo";
import { colors } from "@until-failure-app/src/theme";

export default function AppLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <Text>Loading...</Text>;
  }

  if (isLoaded && !isSignedIn) {
    return <Redirect href="/signin" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarBadgeStyle: {
          backgroundColor: colors.secondary["900"],
        },
        tabBarItemStyle: {
          backgroundColor: colors.secondary["950"],
        },
        tabBarStyle: {
          backgroundColor: colors.secondary["950"],
        },
      }}
    >
      <Tabs.Screen
        name="workouts"
        options={{
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="discover"
        options={{
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="routines"
        options={{
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
