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

  @ManyToOne(() => RoomType, (roomType: RoomType) => roomType.rooms)
  roomType: RoomType;

  @OneToMany(() => Bookings, (bookings: Bookings) => bookings.room)
  bookings: [Bookings];

  isAvailable: boolean;

  vacancies: RoomVacancy[]

  static async get(hotelId: number) {
    return await this.find({ where: { hotelId }, relations: ["roomType", "bookings"] });
  }
}
