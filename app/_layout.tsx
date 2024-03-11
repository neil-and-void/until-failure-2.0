import { Slot } from "expo-router";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import DatabaseProvider from "@until-failure-app/src/components/Database/Database";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Root() {
  return (
    <DatabaseProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <ThemeProvider value={DarkTheme}>
            <Slot />
          </ThemeProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </DatabaseProvider>
  );
}
