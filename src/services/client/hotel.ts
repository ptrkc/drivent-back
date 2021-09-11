import Rooms from "@/entities/Rooms";

export async function getHotelRooms(hotelId: number) {
  const rooms = await Rooms.get(hotelId);
  
  if(rooms.length) {
    rooms.forEach(r => {
      r.isAvailable = r.filledVacancies < r.roomType.vacancies;

      let filled = r.filledVacancies;
      r.vacancies = Array(...Array(r.roomType.vacancies)).map(() => { 
        filled -= 1;
        if(filled >= 0) {
          return { isFilled: true };
        } else {
          return { isFilled: false };
        }
      });
      delete r.roomType;
    });
  }
  return rooms;
}
