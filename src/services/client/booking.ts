import { Booking } from "@/controllers/client/booking";
import Bookings from "@/entities/Bookings";

export async function booking(bookingInfo: Booking) {
  const sendBooking = Bookings.createNewBooking(bookingInfo);
  return sendBooking;
}
