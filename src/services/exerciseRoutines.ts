import { ExerciseRoutine, UpdateExerciseRoutine } from "../types";
import { axiosClient } from "./client";

export const updateExerciseRoutine = async (
  exerciseRoutineId: string,
  updatedExerciseRoutine: UpdateExerciseRoutine,
): Promise<ExerciseRoutine> => {
  const res = await axiosClient.put(
    `/exerciseRoutines/${exerciseRoutineId}`,
    updatedExerciseRoutine,
  );
  return res.data;
};
