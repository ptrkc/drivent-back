
import Accommodation from "@/entities/Accommodation";

export async function createAccommodation() {
  const accommodation = Accommodation.create({
    name: "Sem Hotel",
    price: 0
  });

  await accommodation.save();
}
