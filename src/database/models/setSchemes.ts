import { Model } from "@nozbe/watermelondb";
import { date, field, readonly, relation } from "@nozbe/watermelondb/decorators";

export default class SetScheme extends Model {
  static table = "set_schemes";

  @field("target_duration")
  targetDuration!: number;
  @field("target_reps")
  targetReps!: number;
  @field("set_type")
  setType!: string;
  @field("measurement")
  measurement!: string;
  @field("exercise_routine_id")
  exerciseRoutineId!: string;

  @relation("exercise_routines", "exercise_routine_id")
  exerciseRoutine: any;

  @readonly
  @date("created_at")
  createdAt!: number;
  @readonly
  @date("updated_at")
  updatedAt!: number;
}