import { Routine } from "../types";
import { axiosClient } from "./client";

export const getRoutines = async (userId: string): Promise<Routine[]> => {
  const res = await axiosClient.get(`/users/${userId}/routines`);
  return res.data;
};

export const getRoutine = async (id: string): Promise<Routine> => {
  const res = await axiosClient.get(`/routines/${id}`);
  return res.data;
};
