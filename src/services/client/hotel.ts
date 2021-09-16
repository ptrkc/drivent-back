import Rooms from "@/entities/Rooms";
import Hotel from "@/entities/Hotel";
import HotelsInfo from "@/interfaces/hotelsInfo";
import RoomType from "@/entities/RoomType";

export async function getHotels() {
  const getAllTypes = await RoomType.get();
  const roomTypes: any = {};

  getAllTypes.forEach(rt => {
    const key = rt.id;
    roomTypes[key] = rt.name;
  });

  const getAllHotels = await Hotel.get();
  const response: Array<HotelsInfo> = [];

  getAllHotels.forEach((h) => {
    const hotel = {} as HotelsInfo;
    let allAvailablesVacancies = 0;
    const allRoomsNames: Array<string> = [];
    hotel.id = h.id;
    hotel.name = h.name;
    hotel.img = h.image;

    h.rooms.forEach((r) => {
      const vacancies = r.roomType.vacancies;
      allAvailablesVacancies += vacancies;
      const bookings = r.bookings.length;
      allAvailablesVacancies -= bookings;
    });

    h.roomTypeHotel.forEach(rt => {
      const roomName = roomTypes[rt.roomTypeId];
      allRoomsNames.push(roomName);
    });

    hotel.availableVacancies = allAvailablesVacancies;
    hotel.accomodationsName = allRoomsNames;
    response.push(hotel);
  });
  return response;
}

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
          return { id: i+1, isFilled: false, isSelected: true };
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
