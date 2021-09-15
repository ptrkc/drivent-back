import Rooms from "@/entities/Rooms";

export async function getHotelRooms(hotelId: number, userId: number) {
  const rooms = await Rooms.get(hotelId);

  if(rooms.length) {
    rooms.forEach(r => {
      let filled = r.bookings.length;
      let selectedRoom = r.bookings.find(b => b.userId === userId);
      r.isAvailable = filled < r.roomType.vacancies;
     
      r.vacancies = Array(...Array(r.roomType.vacancies)).map((v, i) => { 
        filled -= 1;
        if(selectedRoom) {
          selectedRoom = null;
          r.isAvailable = true;
          return { id: i+1, isFilled: null, isSelected: true };
        } else if(filled >= 0) {
          return { id: i+1, isFilled: true };
        } else {
          return { id: i+1, isFilled: false };
        }
      });
      delete r.roomType;
      delete r.bookings;
    });
  }
  return rooms;
}
