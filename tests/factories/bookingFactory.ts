
import Bookings from "../../src/entities/Bookings";

export const createBooking = async (userId: number) => {
  const booking = Bookings.create({
    userId,
    isOnline: false,
    hasHotel: true,
    price: 25000
  });

  return booking;
};

export const saveBooking = async (booking: Bookings) => {
  const { id } = await booking.save();
  booking.id = id;

  return booking;
};
