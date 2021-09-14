import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import User from "./User";
import Hotel from "./Hotel";
import Rooms from "./Rooms";
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

  @Column()
  hotelId: number;

  @Column()
  roomId: number;

  @OneToOne(() => User, (user: User) => user.booking)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Hotel, (hotel: Hotel) => hotel.bookings)
  hotel: Hotel;

  @ManyToOne(() => Rooms, (room: Rooms) => room.bookings)
  room: Hotel;

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

