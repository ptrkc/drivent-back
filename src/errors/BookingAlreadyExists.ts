import ConflictError from "@/errors/ConflictError";

export default class BookingAlreadyExistsError extends ConflictError {
  constructor() {
    super("There is already a booking for this user");

    this.name = "BookingAlreadyExistsError";
  }
}
