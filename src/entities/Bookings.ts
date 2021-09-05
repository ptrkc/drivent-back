import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import User from "./User";
import { Booking } from "@/controllers/client/booking";
import BookingAlreadyExistsError from "@/errors/BookingAlreadyExists";

@Entity("bookings")
export default class Bookings extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isOnline: boolean;

  @Column()
  hasHotel: boolean;

  @Column()
  price: number;

  @Column("boolean", { default: false })
  isPaid: boolean;

  @Column()
  userId: number;

  @OneToOne(() => User, (user: User) => user.booking)
  @JoinColumn()
  user: User;

  static async createNewBooking(bookingInfo: Booking) {
    const searchBooking = await this.searchIfAlreadyExistsBooking(bookingInfo.userId);
    if (searchBooking) {
      throw new BookingAlreadyExistsError();
    }
    const userId = bookingInfo.userId;
    const ticketInfo = bookingInfo.ticketInfo;

    const { isOnline, hasHotel, price } = ticketInfo;
    const newBooking = this.create({ isOnline, hasHotel, price, userId });

    await newBooking.save();
    return newBooking;
  }

  static async searchIfAlreadyExistsBooking(userId: number) {
    const booking = await this.findOne({ userId });
    if (booking) {
      return true;
    }
    return false;
  }

  static async payBooking(id: number) {
    const booking = await this.findOne({ id });
    if (!booking) return false;

    await this.update(id, { isPaid: true });
    return true;
  }
}

