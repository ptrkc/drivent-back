import { Booking } from "@/controllers/client/booking";
import Bookings from "@/entities/Bookings";

export async function booking(bookingInfo: Booking, userId: number) {
  const sendBooking = await Bookings.createNewBooking(bookingInfo, userId);
  return sendBooking;
}

export async function getBookingDetails(userId: number) {
  const bookDetails = await Bookings.getDetails(userId);
  return bookDetails;
}
