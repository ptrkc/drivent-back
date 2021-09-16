import ConflictError from "@/errors/ConflictError";

export default class TimeConflict extends ConflictError {
  constructor() {
    super("User has already an activitie at this time!");

    this.name = "TimeConflict";
  }
}
