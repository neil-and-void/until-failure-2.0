import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DatabaseProvider from "@until-failure-app/src/components/Database/Database";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <DatabaseProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <ThemeProvider value={DarkTheme}>
              <Slot />
            </ThemeProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </DatabaseProvider>
    </QueryClientProvider>
  );
}
