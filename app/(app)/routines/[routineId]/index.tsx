import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";
import ExerciseRoutineList from "@until-failure-app/src/components/ExerciseRoutineList";
import TypeForm from "@until-failure-app/src/components/TypeForm";
import {
  EditSetSchemeModalContext,
  EditSetSchemeModalState,
} from "@until-failure-app/src/contexts/EditSetSchemeModalContext";
import { getRoutine } from "@until-failure-app/src/services/routines";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Button, Modal, View } from "react-native";

enum Mode {
  Edit = "EDIT",
  View = "VIEW",
}

interface EditButtonProps {
  mode: Mode;
  onPress: (mode: Mode) => void;
}

const EditButton = ({ mode, onPress }: EditButtonProps) => {
  const handlePress = () => {
    let newMode = Mode.Edit;
    if (mode === Mode.Edit) {
      newMode = Mode.View;
    }
    onPress(newMode);
  };

  let text = "Edit";
  if (mode === Mode.Edit) {
    text = "Done";
  }

  return <Button onPress={() => handlePress()} title={text} />;
};

function ViewRoutine() {
  const { user, isLoaded: userLoaded } = useUser();
  const [editMode, setEditMode] = useState<Mode>(Mode.View);
  const [editSetSchemeState, setEditSetSchemeState] = useState<EditSetSchemeModalState>({
    setScheme: null,
    type: null,
    isOpen: false,
  });

  const { routineId } = useLocalSearchParams();

  const { data: routine, isLoading: routineLoading } = useQuery({
    queryKey: ["routine", routineId],
    queryFn: () => getRoutine(routineId as string),
    enabled: !!user?.id,
  });

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
            headerBackTitle: "routines",
            title: routine?.name || "",
            headerRight: () => <EditButton mode={editMode} onPress={setEditMode} />,
          }}
        />
        <ExerciseRoutineList
          routine={routine}
          loading={!userLoaded || routineLoading}
        />
        <View className="justify-center items-center flex-1 flex flex-col">
          <Modal
            visible={editSetSchemeState.isOpen}
            transparent={true}
            animationType="fade"
          >
            <View className="justify-center items-center flex-1 flex flex-col bg-black/75">
              <View className="flex flex-col justify-center items-center bg-secondary-800 p-4 rounded-lg">
                <TypeForm />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </EditSetSchemeModalContext.Provider>
  );
}

export default ViewRoutine;
