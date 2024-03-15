import { useQuery } from "@tanstack/react-query";
import ExerciseRoutineList from "@until-failure-app/src/components/ExerciseRoutineList";
import TypeForm from "@until-failure-app/src/components/TypeForm";
import { DatabaseContext } from "@until-failure-app/src/contexts/DatabaseContext";
import {
  EditSetSchemeModalContext,
  EditSetSchemeModalState,
} from "@until-failure-app/src/contexts/EditSetSchemeModalContext";
import { Stack, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { Button, Modal, Text, View } from "react-native";

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
  const { db } = useContext(DatabaseContext);
  const [editMode, setEditMode] = useState<Mode>(Mode.View);
  const [editSetSchemeState, setEditSetSchemeState] = useState<EditSetSchemeModalState>({
    setScheme: null,
    type: null,
    isOpen: false,
  });

  const { routineId } = useLocalSearchParams();

  const { data: routine, isLoading: routineLoading } = useQuery({
    queryKey: ["routine", routineId],
    queryFn: () => db.routines.getRoutine(routineId as string),
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
            title: "TODO",
            headerRight: () => <EditButton mode={editMode} onPress={setEditMode} />,
          }}
        />
        <ExerciseRoutineList routine={routine} loading={routineLoading} />
        <View className="justify-center items-center flex-1 flex flex-col">
          <Modal
            visible={editSetSchemeState.isOpen}
            transparent={true}
            animationType="fade"
          >
            <View className="justify-center items-center flex-1 flex flex-col bg-black/75">
              <View className="flex flex-col justify-center items-center bg-secondary-800 p-4 rounded-lg">
                <TypeForm routineId={routine?.id} />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </EditSetSchemeModalContext.Provider>
  );
}

export default ViewRoutine;
