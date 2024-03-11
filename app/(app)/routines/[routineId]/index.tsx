import ExerciseRoutineList from "@until-failure-app/src/components/ExerciseRoutineList";
import TypeForm from "@until-failure-app/src/components/TypeForm";
import {
  EditSetSchemeModalContext,
  EditSetSchemeModalState,
} from "@until-failure-app/src/contexts/EditSetSchemeModalContext";
import { Routine } from "@until-failure-app/src/types";
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
  const [editMode, setEditMode] = useState<Mode>(Mode.View);
  const [editSetSchemeState, setEditSetSchemeState] = useState<EditSetSchemeModalState>({
    setScheme: null,
    type: null,
    isOpen: false,
  });

  const { routineId } = useLocalSearchParams();

  const routine = {
    id: "1234",
    name: "Routine",
    userId: "userid",
    active: true,
    createdAt: "idk",
    exerciseRoutines: [],
  } as Routine;

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
            title: "TODO",
            headerRight: () => <EditButton mode={editMode} onPress={setEditMode} />,
          }}
        />
        <ExerciseRoutineList routine={routine} loading={false} />
        <View className="justify-center items-center flex-1 flex flex-col">
          <Modal
            visible={editSetSchemeState.isOpen}
            transparent={true}
            animationType="fade"
          >
            <View className="justify-center items-center flex-1 flex flex-col bg-black/75">
              <View className="flex flex-col justify-center items-center bg-secondary-800 p-4 rounded-lg">
                <TypeForm routineId={routine.id} />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </EditSetSchemeModalContext.Provider>
  );
}

export default ViewRoutine;
