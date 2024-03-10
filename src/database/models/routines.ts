import { Model } from "@nozbe/watermelondb";
import { Q } from "@nozbe/watermelondb";
import { children, date, field, readonly, relation, writer } from "@nozbe/watermelondb/decorators";
import { CreateRoutine, Routine as RoutineType } from "@until-failure-app/src/types";

export default class Routine extends Model {
  static table = "routines";

  @readonly
  @date("created_at")
  createdAt!: number;
  @readonly
  @date("updated_at")
  updatedAt!: number;
  @field("name")
  name!: string;
  @field("active")
  active!: boolean;
  @field("private")
  private!: boolean;
  @relation("users", "user_id")
  user!: Q.Relation<User>;
  @children("exercise_routines")
  exerciseRoutines!: Q.Relation<ExerciseRoutine>;
  @children("workouts")
  workouts!: Q.Relation<Workout>;

  @writer
  async create(routine: CreateRoutine) {}

  @writer
  async get(id: string) {}

  @writer
  async getUsersRoutines(userId: string) {}

  @writer
  async update() {}

  @writer
  async delete() {}
}
