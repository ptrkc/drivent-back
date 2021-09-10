import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import User from "./User";
import Booking from "@/interfaces/booking";
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

  static async createNewBooking(bookingInfo: Booking, userId: number) {
    const searchBooking = await this.getDetails(userId);
    if(searchBooking) {
      throw new BookingAlreadyExistsError();
    }

    const { isOnline, hasHotel, price } = bookingInfo;
    const newBooking = this.create({ isOnline, hasHotel, price, userId });

    await newBooking.save();
    return newBooking;
  }

  static async getDetails(userId: number) {
    const booking = await this.findOne({ userId });
    
    return booking;
  }

  static async payBooking(id: number) {
    const booking = await this.findOne({ id });
    if (!booking) return false;

    await this.update(id, { isPaid: true });
    return true;
  }
}

