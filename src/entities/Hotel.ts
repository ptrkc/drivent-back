import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import Rooms from "./Rooms";
import RoomTypeHotel from "./RoomTypeHotel";

import HotelsInfo from "@/interfaces/hotelsInfo";

@Entity("hotel")
export default class Hotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => Rooms, (rooms: Rooms) => rooms.hotel)
  rooms: [Rooms];

  @OneToMany(() => RoomTypeHotel, (roomTypeHotel: RoomTypeHotel) => roomTypeHotel.hotel)
  roomTypeHotel: [RoomTypeHotel];

  static async get() {
    const getHotels = await this.find();
    const response: Array<HotelsInfo> = [];
    getHotels.forEach((e) => {
      const hotel = {} as HotelsInfo;
      let allVacancies = 0;
      const allRoomsNames: Array<string> = [];
      hotel.id = e.id;
      hotel.name = e.name;
      e.rooms.forEach((i) => {
        const vacancies = i.roomType.vacancies;
        allVacancies += vacancies;
        const roomName = i.roomType.name;
        if(!allRoomsNames.includes(roomName)) {
          allRoomsNames.push(roomName);
        }
      });
      hotel.availableVacancies = allVacancies;
      hotel.accomodationsName = allRoomsNames;
      response.push(hotel);
    });
    return response;
  }
}
