import { Model } from "@nozbe/watermelondb";
import { date, field, readonly, writer } from "@nozbe/watermelondb/decorators";
import { CreateRoutine } from "@until-failure-app/src/types";

export default class Routine extends Model {
  static table = "routines";

  @field("name")
  name!: string;
  @field("active")
  active!: boolean;
  @field("private")
  private!: boolean;

  @readonly
  @date("created_at")
  createdAt!: number;
  @readonly
  @date("updated_at")
  updatedAt!: number;

  @writer
  async createRoutine(routine: CreateRoutine) {}

  @writer
  async getRoutine(id: string) {}

  @writer
  async getRoutines(userId: string) {}

  @writer
  async updateRoutine() {}

  @writer
  async deleteRoutine() {}
}
