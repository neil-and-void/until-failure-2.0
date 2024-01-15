import { Tabs } from "expo-router";

export default function HomeTabs() {
  return (
    <Tabs>
      <Tabs.Screen name="sessions" />
      <Tabs.Screen name="routines" />
      <Tabs.Screen name="stats" />
    </Tabs>
  );
}
