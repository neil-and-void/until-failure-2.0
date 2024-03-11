import { Tabs } from "expo-router";

import { colors } from "@until-failure-app/src/theme";

export default function AppLayout() {
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
        name="routines"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
