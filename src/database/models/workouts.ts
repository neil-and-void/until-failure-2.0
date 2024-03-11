import { Model } from "@nozbe/watermelondb";
import { date, field, readonly, relation } from "@nozbe/watermelondb/decorators";

export default class Workout extends Model {
  static table = "workouts";

  @field("start")
  start!: number;
  @field("end")
  end!: number;

  @relation("routines", "routine_id")
  routines;

  @readonly
  @date("created_at")
  createdAt!: number;
  @readonly
  @date("updated_at")
  updatedAt!: number;
}
