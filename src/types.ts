export type Routine = {
  id: string;
  name: string;
  userId: string;
  active: boolean;
  createdAt: string;
  exerciseRoutines: ExerciseRoutine[];
};

export type ExerciseRoutine = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  active: boolean;
  routineId: string;
  setSchemes: SetScheme[];
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

// export interface Workout {}
// export interface Exercise {}
// export interface ExerciseSet {}
