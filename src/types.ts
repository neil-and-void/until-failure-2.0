export type Routine = {
  id: string;
  name: string;
  active: boolean;
  exerciseRoutines: ExerciseRoutine[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type CreateRoutine = Omit<
  Routine,
  "id" | "exerciseRoutines" | "active" | "createdAt" | "deletedAt" | "updatedAt"
>;

export type UpdateRoutine = {
  name: string;
};

export type ExerciseRoutine = {
  id: string;
  name: string;
  active: boolean;
  routineId: string;
  setSchemes: SetScheme[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type UpdateExerciseRoutine = {
  name: string;
};

export type SetScheme = {
  id: string;
  targetReps: number;
  measurement: MeasurementType;
  setType: SetType;
  exerciseRoutineId: string;
};

export type CreateSetScheme = Omit<SetScheme, "id">;

export type UpdateSetScheme = Omit<SetScheme, "id" | "exerciseRoutineId">;

export type SetType = "WARMUP" | "WORKING" | "DROP" | "SUPER";

export type MeasurementType =
  | "WEIGHT"
  | "DURATION"
  | "WEIGHTED_DURATION"
  | "BODYWEIGHT";

export enum EditSetSchemeModalType {
  measurementType = "MEASUREMENT_TYPE",
  setType = "SET_TYPE",
}

// export interface Workout {}
// export interface Exercise {}
// export interface ExerciseSet {}
