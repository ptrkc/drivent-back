import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import Rooms from "./Rooms";
import RoomTypeHotel from "./RoomTypeHotel";

@Entity("hotel")
export default class Hotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Rooms, (rooms: Rooms) => rooms.hotel)
  rooms: [Rooms];

  @OneToMany(() => RoomTypeHotel, (roomTypeHotel: RoomTypeHotel) => roomTypeHotel.hotel)
  roomTypeHotel: [RoomTypeHotel];
}
