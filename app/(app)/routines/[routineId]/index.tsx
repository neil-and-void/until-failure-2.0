import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";
import ExerciseRoutineList from "@until-failure-app/src/components/ExerciseRoutineList";
import { getRoutine } from "@until-failure-app/src/services/routines";
import { Stack, useLocalSearchParams } from "expo-router";
import { TextInput, View } from "react-native";

function ViewRoutine() {
  const { user, isLoaded: userLoaded } = useUser();

  const { routineId } = useLocalSearchParams();

  const { data, isLoading: routineLoading } = useQuery({
    queryKey: ["routine", routineId],
    queryFn: () => getRoutine(routineId as string),
    enabled: !!user?.id,
  });

  const handleOnChange = (s: string) => {
    console.log(s);
  };

  return (
    <View>
      <Stack.Screen options={{ headerBackTitle: "routines", title: "" }} />
      <ExerciseRoutineList
        routineName={data?.name || ""}
        exerciseRoutines={data?.exerciseRoutines || []}
        loading={!userLoaded || routineLoading}
      />
    </View>
  );
}

export default ViewRoutine;
