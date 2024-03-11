import { ExerciseRoutine as ExerciseRoutineType } from "@until-failure-app/src/types";
import clsx from "clsx";
import { Pressable, Text, TextInput as RNTextInput, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Button from "../Button";
import SetScheme from "../SetScheme";

interface ExerciseRoutineProps {
  exerciseRoutine: ExerciseRoutineType;
}

const ExerciseRoutine = ({ exerciseRoutine }: ExerciseRoutineProps) => {
  return (
    <View className="pb-6">
      <View className="pb-2 px-4">
        <RNTextInput
          value={exerciseRoutine.name}
          className="text-2xl text-white"
          onChangeText={(name) => {
            console.log(name);
          }}
        />
        <Text className="text-secondary-300">
          {exerciseRoutine.setSchemes.length} set
          {exerciseRoutine.setSchemes.length === 1 ? "" : "s"}
        </Text>
      </View>

      <View className="pb-2">
        {exerciseRoutine.setSchemes.length
          ? (
            exerciseRoutine.setSchemes.map((setScheme, idx) => (
              <View
                key={setScheme.id}
                className={clsx("px-4", {
                  "pb-2": idx < exerciseRoutine.setSchemes.length - 1,
                })}
              >
                <Swipeable
                  renderRightActions={() => (
                    <Pressable className="flex flex-col justify-center px-2">
                      <Text className="text-delete">delete</Text>
                    </Pressable>
                  )}
                >
                  <View>
                    <SetScheme
                      setScheme={setScheme}
                      routineId={exerciseRoutine.routineId}
                    />
                  </View>
                </Swipeable>
              </View>
            ))
          )
          : (
            <View className="flex flex-row justify-center py-3">
              <Text className="text-white">No sets yet</Text>
            </View>
          )}
      </View>

      <View className="px-4">
        <Button disabled={false} onPress={() => console.log("hi")}>
          <View className="flex flex-row justify-center">
            <Text className="text-white">Add set</Text>
          </View>
        </Button>
      </View>
    </View>
  );
};

export default ExerciseRoutine;
