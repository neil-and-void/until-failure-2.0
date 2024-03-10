import { Model } from "@nozbe/watermelondb";
import { children, date, field, writer } from "@nozbe/watermelondb/decorators";

export default class User extends Model {
  static table = "users";

  @field("email")
  email;
  @date("created_at")
  createdAt;
  @date("updated_at")
  updatedAt;
  @children("routines")
  routines;
}
