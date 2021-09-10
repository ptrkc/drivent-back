import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import RoomTypeHotel from "./RoomTypeHotel";
import Rooms from "./Rooms";

@Entity("roomType")
export default class RoomType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  vacancies: number;

  @OneToMany(() => RoomTypeHotel, (roomTypeHotel: RoomTypeHotel) => roomTypeHotel.hotel)
  roomTypeHotel: RoomTypeHotel[];

  @OneToMany(() => Rooms, (rooms: Rooms) => rooms.roomType)
  rooms: Rooms[];
}
