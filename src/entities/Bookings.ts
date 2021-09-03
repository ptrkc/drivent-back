import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import User from "./User";
import { Booking } from "@/controllers/client/booking";

@Entity("bookings")
export default class Bookings extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isOnline: boolean;

  @Column("boolean", { default: false })
  hasHotel: boolean;

  @Column("boolean", { default: false })
  isPaid: boolean;

  @Column()
  userId: number;

  @OneToOne(() => User, (user: User) => user.booking)
  @JoinColumn()
  user: User;

  static async createNewBooking(bookingInfo: Booking) {
    const newBooking = this.create({ isOnline: true, userId: bookingInfo.userId });
    await newBooking.save();
    return newBooking;
  }
}

