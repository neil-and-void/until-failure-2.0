import { colors } from "@until-failure-app/src/theme";
import { Tabs } from "expo-router";

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
        name="library"
        options={{
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="stats"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
