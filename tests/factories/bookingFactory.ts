
import Bookings from "@/entities/Bookings";

export async function createBook() {
  const book = Bookings.create({
    isOnline: true,
    hasHotel: false,
    price: 100
  });
  return book;
}

export async function saveBook(userId: number) {
  const booking = await createBook();

  booking.userId = userId;

  await booking.save();
}
