import { Model } from "@nozbe/watermelondb";
import { Q } from "@nozbe/watermelondb";
import { date, field, readonly, relation } from "@nozbe/watermelondb/decorators";
import ExerciseRoutine from "./ExerciseRoutine"; // Adjust path as necessary

export default class SetScheme extends Model {
  static table = "set_schemes";

  @readonly
  @date("created_at")
  createdAt!: number;
  @readonly
  @date("updated_at")
  updatedAt!: number;
  @field("target_duration")
  targetDuration!: number;
  @field("target_reps")
  targetReps!: number;
  @field("set_type")
  setType!: string;
  @field("measurement")
  measurement!: string;
  @relation("exercise_routines", "exercise_routine_id")
  exerciseRoutine!: Q.Relation<ExerciseRoutine>;
}
