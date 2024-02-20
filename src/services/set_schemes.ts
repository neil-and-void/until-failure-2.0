import { type CreateSetScheme, type SetScheme, UpdateSetScheme } from "../types";
import { axiosClient } from "./client";

export const createSetScheme = async (
  setScheme: CreateSetScheme,
): Promise<SetScheme> => {
  const res = await axiosClient.post(`/setSchemes`, setScheme);
  return res.data;
};

export const updateSetScheme = async (
  setSchemeId: string,
  setScheme: UpdateSetScheme,
) => {
  const res = await axiosClient.put(`/setSchemes/${setSchemeId}`, setScheme);
  return res.data;
};
