import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import Hotel from "./Hotel";
import RoomType from "./RoomType";

@Entity("roomTypeHotel")
export default class RoomTypeHotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hotelId: number;

  @Column()
  roomTypeId: number;

  @ManyToOne(() => Hotel, (hotel: Hotel) => hotel.rooms)
  hotel: Hotel;

  @ManyToOne(() => RoomType, (roomType: RoomType) => roomType.roomTypeHotel)
  roomType: RoomType;
}
