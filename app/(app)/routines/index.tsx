import { useUser } from "@clerk/clerk-expo";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import RoutineList from "@until-failure-app/src/components/RoutineList";
import { getRoutines } from "@until-failure-app/src/services/routines";
import { colors } from "@until-failure-app/src/theme";
import { Stack } from "expo-router";
import { useCallback, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Routines() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { user, isLoaded: userLoaded } = useUser();

  const { data, isLoading: routinesLoading } = useQuery({
    queryKey: ["routines"],
    queryFn: () => getRoutines(user?.id || ""),
    enabled: !!user?.id,
  });

  const handlePresentModalPress = useCallback(() => {
    console.log("wuhgood");
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="px-4 flex flex-row justify-between">
        <Text className="text-white text-4xl self-start">Routines</Text>
        <Pressable
          onPress={() => handlePresentModalPress()}
          className="self-start"
        >
          <Text className="text-white text-3xl">+</Text>
        </Pressable>
      </View>

      <RoutineList
        routines={data || []}
        loading={!userLoaded || routinesLoading}
      />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={["92%"]}
        onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: colors.secondary["900"],
        }}
        style={{
          shadowColor: "#ff0000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Text className="dark:text-white">HI</Text>
      </BottomSheetModal>
    </SafeAreaView>
  );
}
