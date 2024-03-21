import { Exercise as ExerciseType } from "@until-failure-app/src/types";
import { Pressable, Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { SetEntry } from "../SetEntry";

interface ExerciseProps {
  exercise: ExerciseType;
}

export const Exercise = ({ exercise }: ExerciseProps) => {
  return (
    <View>
      <View>
        <Text className="text-white font-medium text-lg">{exercise.exerciseRoutine.name}</Text>
      </View>
      <View>
        {exercise.setEntries.map(setEntry => (
          <Swipeable
            key={setEntry.id}
            renderRightActions={() => (
              <Pressable
                className="flex flex-col justify-center px-2"
                onPress={() => console.log("set entry")}
              >
                <Text className="text-delete">delete</Text>
              </Pressable>
            )}
          >
            <SetEntry setEntry={setEntry} />
          </Swipeable>
        ))}
      </View>
    </View>
  );
};
