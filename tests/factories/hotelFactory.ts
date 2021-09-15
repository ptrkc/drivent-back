import Hotel from "@/entities/Hotel";
import RoomType from "@/entities/RoomType";
import Rooms from "@/entities/Rooms";

export async function create() {
  const hotel = Hotel.create({
    name: "Test Hotel"
  });
  await hotel.save();
}

export async function createRoomType() {
  const roomType = RoomType.create({
    name: "Test Single",
    vacancies: 1
  });
  await roomType.save();
}

export async function createHotelRoom() {
  const rooms = Rooms.create({
    number: "00", 
    hotelId: 1,
    roomTypeId: 1,
    filledVacancies: 1,
  });
  await rooms.save();
}
