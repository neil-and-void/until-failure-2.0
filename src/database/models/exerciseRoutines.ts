import { Model } from "@nozbe/watermelondb";
import { Q } from "@nozbe/watermelondb";
import { children, date, field, readonly, relation } from "@nozbe/watermelondb/decorators";
import Routine from "./Routine"; // Adjust path as necessary
import SetScheme from "./SetScheme"; // Adjust path as necessary

export default class ExerciseRoutine extends Model {
  static table = "exercise_routines";

  @readonly @date("created_at")
  createdAt!: number;
  @readonly @date("updated_at")
  updatedAt!: number;
  @field("name")
  name!: string;
  @field("active")
  active!: boolean;
  @relation("routines", "routine_id")
  routine!: Q.Relation<Routine>;
  @children("set_schemes")
  setSchemes!: Q.Relation<SetScheme>;
}
