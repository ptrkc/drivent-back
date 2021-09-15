import Rooms from "@/entities/Rooms";
import Hotel from "@/entities/Hotel";

export async function getHotels() {
  const hotels = await Hotel.get();
  return hotels;
}

export async function getHotelRooms(hotelId: number) {
  const rooms = await Rooms.get(hotelId);
  
  if(rooms.length) {
    rooms.forEach(r => {
      r.isAvailable = r.filledVacancies < r.roomType.vacancies;

      let filled = r.filledVacancies;
      r.vacancies = Array(...Array(r.roomType.vacancies)).map((v, i) => { 
        filled -= 1;
        if(filled >= 0) {
          return { id: i+1, isFilled: true };
        } else {
          return { id: i+1, isFilled: false };
        }
      });
      delete r.roomType;
    });
  }
  return rooms;
}
