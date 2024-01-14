import { Tabs } from "expo-router"

export default function HomeTabs() {
  return (
    <Tabs>
      <Tabs.Screen
        name="stats"
      />
      <Tabs.Screen
        name="routines"
      />  
    </Tabs>
  )
}
