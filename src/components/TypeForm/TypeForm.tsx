import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditSetSchemeModalContext } from "@until-failure-app/src/contexts/EditSetSchemeModalContext";
import { updateSetScheme } from "@until-failure-app/src/services/setSchemes";
import {
  EditSetSchemeModalType,
  MeasurementType,
  SetScheme,
  SetType,
  UpdateSetScheme,
} from "@until-failure-app/src/types";
import { useContext, useState } from "react";
import { Button, Text, View } from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";

const measurementTypeOptions: RadioButtonProps[] = [
  {
    label: "weight",
    id: "WEIGHT",
    color: "#ffffff",
    labelStyle: {
      color: "#ffffff",
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  {
    label: "duration",
    id: "DURATION",
    color: "#ffffff",
    labelStyle: {
      color: "#ffffff",
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  {
    label: "weighted duration",
    id: "WEIGHTED_DURATION",
    color: "#ffffff",
    labelStyle: {
      color: "#ffffff",
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  {
    label: "bodyweight",
    id: "BODYWEIGHT",
    color: "#ffffff",
    labelStyle: {
      color: "#ffffff",
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
];

const setTypeOptions: RadioButtonProps[] = [
  {
    label: "working",
    id: "WORKING",
    color: "#ffffff",
    labelStyle: {
      color: "#ffffff",
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  {
    label: "warmup",
    id: "WARMUP",
    color: "#ffffff",
    labelStyle: {
      color: "#ffffff",
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  {
    label: "dropset",
    id: "DROPSET",
    color: "#ffffff",
    labelStyle: {
      color: "#ffffff",
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  {
    label: "superset",
    id: "SUPERSET",
    color: "#ffffff",
    labelStyle: {
      color: "#ffffff",
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
];

interface SetTypeForm {
  setIsOpen: (isOpen: boolean) => void;
  setScheme: SetScheme;
  onSave: (setScheme: SetScheme) => void;
}

const SetTypeForm = ({ setIsOpen, setScheme, onSave }: SetTypeForm) => {
  const [selectedSetType, setSelectedSetType] = useState<SetType>(
    setScheme.setType,
  );

  const handleSave = () => {
    onSave({ ...setScheme, setType: selectedSetType });
  };

  return (
    <View>
      <Text className="text-white">Select a set type</Text>
      <RadioGroup
        radioButtons={setTypeOptions}
        onPress={(selectedId) => setSelectedSetType(selectedId as SetType)}
        selectedId={selectedSetType}
        containerStyle={{
          alignItems: "baseline",
        }}
      />
      <View className="flex flex-row justify-end items-center">
        <Button title="cancel" onPress={() => setIsOpen(false)} />
        <Button title="save" onPress={() => handleSave()} />
      </View>
    </View>
  );
};

interface MeasurementTypeFormProps {
  setIsOpen: (isOpen: boolean) => void;
  setScheme: SetScheme;
  onSave: (setScheme: SetScheme) => void;
}

const MeasurementTypeForm = ({
  setIsOpen,
  setScheme,
  onSave,
}: MeasurementTypeFormProps) => {
  const [selectedMeasurement, setSelectedMeasurement] = useState<MeasurementType>(setScheme.measurement);

  const handleSave = () => {
    onSave({ ...setScheme, measurement: selectedMeasurement });
  };

  return (
    <View>
      <Text className="text-white">Select a measurement type</Text>
      <RadioGroup
        radioButtons={measurementTypeOptions}
        onPress={(selectedId) => setSelectedMeasurement(selectedId as MeasurementType)}
        selectedId={selectedMeasurement}
        containerStyle={{
          alignItems: "baseline",
        }}
      />
      <View className="flex flex-row justify-end items-center">
        <Button title="cancel" onPress={() => setIsOpen(false)} />
        <Button title="save" onPress={() => handleSave()} />
      </View>
    </View>
  );
};

interface TypeFormProps {
  routineId: string;
}

const TypeForm = ({ routineId }: TypeFormProps) => {
  const { editSetSchemeModalState, setEditSetSchemeModalState } = useContext(
    EditSetSchemeModalContext,
  );

  const queryClient = useQueryClient();

  const { mutate: updateSetSchemeMutation } = useMutation({
    mutationFn: (updatedSetScheme: UpdateSetScheme) =>
      updateSetScheme(editSetSchemeModalState.setScheme!.id, updatedSetScheme),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["routine", routineId] }),
  });

  const setIsOpen = (isOpen: boolean) => {
    setEditSetSchemeModalState({ ...editSetSchemeModalState, isOpen });
  };

  const handleSave = (updatedSetScheme: SetScheme) => {
    const { setType, measurement, targetReps } = updatedSetScheme;
    updateSetSchemeMutation({ setType, measurement, targetReps });
  };

  if (editSetSchemeModalState.setScheme === null) {
    return (
      <View>
        <Text className="text-white">set scheme is null</Text>
        <View className="flex flex-row justify-end items-center">
          <Button title="cancel" onPress={() => setIsOpen(false)} />
        </View>
      </View>
    );
  }

  if (editSetSchemeModalState.type === EditSetSchemeModalType.setType) {
    return (
      <SetTypeForm
        setScheme={editSetSchemeModalState.setScheme}
        setIsOpen={setIsOpen}
        onSave={handleSave}
      />
    );
  } else if (
    editSetSchemeModalState.type === EditSetSchemeModalType.measurementType
  ) {
    return (
      <MeasurementTypeForm
        setScheme={editSetSchemeModalState.setScheme}
        setIsOpen={setIsOpen}
        onSave={handleSave}
      />
    );
  } else {
    return (
      <View>
        <Text className="text-white">unrecognized type</Text>
        <View className="flex flex-row justify-end items-center">
          <Button title="cancel" onPress={() => setIsOpen(false)} />
        </View>
      </View>
    );
  }
};

export default TypeForm;
