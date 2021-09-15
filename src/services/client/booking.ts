import Booking from "@/interfaces/booking";
import Bookings from "@/entities/Bookings";
import { PaymentInfo } from "@/interfaces/payment";
import creditCard from "@/schemas/creditCard";
import Room from "@/interfaces/room";

export async function booking(bookingInfo: Booking, userId: number) {
  const sendBooking = await Bookings.createNewBooking(bookingInfo, userId);
  return sendBooking;
}

export async function bookingRoom( roomInfo: Room, userId: number) {
  const sendBookingRoom = await Bookings.updateBookingRoom(roomInfo, userId);
  return sendBookingRoom;
}

export async function getBookingDetails(userId: number) {
  const bookDetails = await Bookings.getDetails(userId);
  return bookDetails;
}

export async function pay(id: number) {
  const pay = await Bookings.payBooking(id);
  if (!pay || isNaN(id)) return false;

  return true;
}

export async function validateCard(paymentInfo: PaymentInfo) {
  if (creditCard.validate(paymentInfo).error) return false;

  return true;
}
