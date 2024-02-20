import { ExerciseRoutine } from "../types";
import { axiosClient } from "./client";

export const getExerciseRoutines = async (): Promise<ExerciseRoutine[]> => {
  const res = await axiosClient.get(`/exerciseRoutines`);
  return res.data;
};
