import { Model } from "@nozbe/watermelondb";
import { date, field, readonly, relation } from "@nozbe/watermelondb/decorators";

export default class ExerciseRoutine extends Model {
  static table = "exercise_routines";

  @field("name")
  name!: string;
  @field("active")
  active!: boolean;

  @relation("routines", "routine_id")
  routine;

  @readonly
  @date("created_at")
  createdAt!: number;
  @readonly
  @date("updated_at")
  updatedAt!: number;
}