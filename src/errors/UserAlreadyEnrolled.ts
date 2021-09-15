import ConflictError from "@/errors/ConflictError";

export default class UserAlreadyEnrolled extends ConflictError {
  constructor() {
    super("User is already enrolled in this activitie!");

    this.name = "UserAlreadyEnrolled";
  }
}
