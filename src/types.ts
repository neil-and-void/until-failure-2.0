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

export enum MeasurementType {
  weight = "WEIGHT",
  duration = "DURATION",
  weightedDuration = "WEIGHTED_DURATION",
  bodyweight = "BODYWEIGHT",
  counterweight = "COUNTERWEIGHT",
}

export enum SetType {
  warmup = "WARMUP",
  working = "WORKING",
  drop = "DROP",
  super = "SUPER",
}

export enum EditSetSchemeModalType {
  measurementType = "MEASUREMENT_TYPE",
  setType = "SET_TYPE",
}

export interface SetEntry {
  id: string;
  weight: number | null;
  reps: number | null;
  seconds: number | null;
  setType: SetType;
  measurement: MeasurementType;
  exerciseId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface Exercise {
  id: string;
  notes: string;
  workoutId: string;
  exerciseRoutineId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  exerciseRoutine: ExerciseRoutine;
  setEntries: SetEntry[];
}

export interface Workout {
  id: string;
  start: Date;
  end: Date | null;
  routineId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  routine: Routine;
  exercises: Exercise[];
}
