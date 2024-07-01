import { useQuery } from "@tanstack/react-query";
import EditSetScheme from "@until-failure-app/src/components/EditSetScheme";
import ExerciseRoutine from "@until-failure-app/src/components/ExerciseRoutine/ExerciseRoutine";
import { DatabaseContext } from "@until-failure-app/src/contexts/DatabaseContext";
import {
  EditSetSchemeModalContext,
  EditSetSchemeModalState,
} from "@until-failure-app/src/contexts/EditSetSchemeModalContext";
import { Stack, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { Modal, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

function ViewExerciseRoutine() {
  const { db } = useContext(DatabaseContext);

  const [editSetSchemeState, setEditSetSchemeState] = useState<EditSetSchemeModalState>({
    setScheme: null,
    type: null,
    isOpen: false,
  });

  const { exerciseRoutineId } = useLocalSearchParams();

  const { data: exerciseRoutine, isLoading: exerciseRoutineLoading } = useQuery({
    queryKey: ["exerciseRoutine", exerciseRoutineId],
    queryFn: () => db.exerciseRoutines.getExerciseRoutine(exerciseRoutineId as string),
  });

  console.log(editSetSchemeState);

  if (exerciseRoutineLoading) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }

  if (!exerciseRoutine) {
    return (
      <View>
        <Text>Couldn't find exercise</Text>
      </View>
    );
  }

  return (
    <EditSetSchemeModalContext.Provider
      value={{
        editSetSchemeModalState: editSetSchemeState,
        setEditSetSchemeModalState: setEditSetSchemeState,
      }}
    >
      <View>
        <Stack.Screen
          options={{
            headerBackTitle: "exercises",
            title: "",
          }}
        />
        <ScrollView className="h-screen">
          <ExerciseRoutine exerciseRoutine={exerciseRoutine} />
        </ScrollView>

        <View className="justify-center items-center flex-1 flex flex-col">
          <Modal
            visible={editSetSchemeState.isOpen}
            transparent={true}
            animationType="fade"
          >
            <View className="justify-center items-center flex-1 flex flex-col bg-black/75">
              <View className="flex flex-col justify-center items-center bg-secondary-800 p-4 rounded-lg">
                <EditSetScheme exerciseRoutineId={exerciseRoutine.id} />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </EditSetSchemeModalContext.Provider>
  );
}

export default ViewExerciseRoutine;
