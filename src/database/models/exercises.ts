import { Model } from "@nozbe/watermelondb";
import { date, field, readonly, relation } from "@nozbe/watermelondb/decorators";

export default class Exercise extends Model {
  static table = "exercises";

  @field("notes")
  notes!: string;

  @relation("exercise_routines", "exercise_routine_id")
  exerciseRoutines;
  @relation("routines", "routine_id")
  routines;

  @readonly
  @date("created_at")
  createdAt!: number;
  @readonly
  @date("updated_at")
  updatedAt!: number;
}
