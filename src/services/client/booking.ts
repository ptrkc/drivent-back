import { Booking } from "@/controllers/client/booking";
import Bookings from "@/entities/Bookings";
import { PaymentInfo } from "@/interfaces/payment";
import creditCard from "@/schemas/creditCard";

export async function booking(bookingInfo: Booking) {
  const sendBooking = Bookings.createNewBooking(bookingInfo);
  return sendBooking;
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
