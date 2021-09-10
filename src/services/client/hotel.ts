import Rooms from "@/entities/Rooms";

export async function getHotelRooms(hotelId: number) {
  const rooms = await Rooms.get(hotelId);
  
  if(rooms.length) {
    rooms.forEach(r => {
      r.isAvailable = r.filledVacancies < r.roomType.vacancies;
    });
  }
  return rooms;
}
