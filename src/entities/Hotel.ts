import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";

import Rooms from "./Rooms";
import RoomTypeHotel from "./RoomTypeHotel";
import Bookings from "./Bookings";
import Booking from "@/interfaces/booking";

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

  @OneToMany(() => Bookings, (bookings: Bookings) => bookings.hotel)
  bookings: [Bookings]
}
