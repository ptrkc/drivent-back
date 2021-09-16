import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

import { RoomVacancy } from "@/interfaces/hotel";
import Hotel from "./Hotel";
import RoomType from "./RoomType";
import Bookings from "./Bookings";

@Entity("rooms")
export default class Rooms extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  hotelId: number;

  @Column()
  roomTypeId: number;

  @ManyToOne(() => Hotel, (hotel: Hotel) => hotel.rooms)
  hotel: Hotel;

  @ManyToOne(() => RoomType, (roomType: RoomType) => roomType.rooms, { eager: true })
  roomType: RoomType;

  @OneToMany(() => Bookings, (bookings: Bookings) => bookings.room)
  bookings: [Bookings];

  isAvailable: boolean;

  vacancies: RoomVacancy[]

  static async get(hotelId: number) {
    const hotelRooms = await this.find({ where: { hotelId }, relations: ["roomType", "bookings"] });
    hotelRooms?.sort(function(a, b) {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
    return hotelRooms;
  }
}
