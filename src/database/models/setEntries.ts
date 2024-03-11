import { Model } from "@nozbe/watermelondb";
import { date, field, readonly, relation } from "@nozbe/watermelondb/decorators";

export default class SetEntry extends Model {
  static table = "set_entries";

  @field("weight")
  weight!: number;
  @field("reps")
  reps!: number;
  @field("seconds")
  seconds!: number;
  @field("set_type")
  setType!: string;
  @field("measurement")
  measurement!: string;
  @field("exercise_id")
  exerciseId!: string;
  @field("set_scheme_id")
  setSchemeId!: string;

  @relation("exercise_routines", "exercise_routine_id")
  exerciseRoutine: any;
  @relation("set_schemes", "set_scheme_id")
  setSchemes: any;

  @readonly
  @date("created_at")
  createdAt!: number;
  @readonly
  @date("updated_at")
  updatedAt!: number;
}
