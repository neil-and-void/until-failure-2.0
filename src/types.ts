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

export type UpdateRoutine = Omit<
  Routine,
  "active" | "setSchemes" | "createdAt" | "updatedAt" | "deletedAt" | "exerciseRoutines"
>;

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

export type NewExerciseRoutine = Omit<
  ExerciseRoutine,
  "active" | "id" | "setSchemes" | "createdAt" | "updatedAt" | "deletedAt"
>;

export type UpdateExerciseRoutine = Omit<
  ExerciseRoutine,
  "active" | "routineId" | "setSchemes" | "createdAt" | "updatedAt" | "deletedAt"
>;

export type SetScheme = {
  id: string;
  targetReps: number | null;
  targetDuration: number | null;
  measurement: MeasurementType;
  setType: SetType;
  exerciseRoutineId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type NewSetScheme = Omit<
  SetScheme,
  "id" | "targetReps" | "targetDuration" | "createdAt" | "updatedAt" | "deletedAt"
>;

export type UpdateSetScheme = Omit<SetScheme, "exerciseRoutineId" | "createdAt" | "updatedAt" | "deletedAt">;

export type SetType = "WARMUP" | "WORKING" | "DROP" | "SUPER";

export type MeasurementType =
  | "WEIGHT"
  | "DURATION"
  | "WEIGHTED_DURATION"
  | "BODYWEIGHT"
  | "COUNTERWEIGHT";

export enum EditSetSchemeModalType {
  measurementType = "MEASUREMENT_TYPE",
  setType = "SET_TYPE",
}

// export interface Workout {}
// export interface Exercise {}
// export interface ExerciseSet {}
