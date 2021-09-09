
import Bookings from "../../src/entities/Bookings";
import { createSession } from "./sessionFactory";

export const createBooking = async () => {
  const session = await createSession();
  const booking = Bookings.create({
    userId: session.userId,
    isOnline: false,
    hasHotel: true,
    price: 25000
  });

  const { id } = await booking.save();
  booking.id = id;

  return booking;
};
