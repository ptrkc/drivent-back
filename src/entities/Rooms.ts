import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import Hotel from "./Hotel";
import RoomType from "./RoomType";

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

  @Column()
  filledVacancies: number;

  @ManyToOne(() => Hotel, (hotel: Hotel) => hotel.rooms)
  hotel: Hotel;

  @ManyToOne(() => RoomType, (roomType: RoomType) => roomType.rooms)
  roomType: RoomType;

  isAvailable: boolean;

  static async get(hotelId: number) {
    return await this.find({ where: { hotelId } });
  }
}
