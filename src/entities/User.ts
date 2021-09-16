import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import bcrypt from "bcrypt";
import EmailNotAvailableError from "@/errors/EmailNotAvailable";

import Bookings from "./Bookings";
import Activitie from "./Activitie";

@Entity("users")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @OneToOne(() => Bookings, (booking: Bookings) => booking.user)
  booking: Bookings;

  @ManyToMany(() => Activitie, activities => activities.users)
  activities: [Activitie];

  static async createNew(email: string, password: string) {
    await this.validateDuplicateEmail(email);
    const hashedPassword = this.hashPassword(password);

    const newUser = this.create({ email, password: hashedPassword });
    await newUser.save();

    return newUser;
  }

  static hashPassword(password: string) {
    return bcrypt.hashSync(password, 12);
  }

  static async validateDuplicateEmail(email: string) {
    const user = await this.findOne({ email });

    if(user) {
      throw new EmailNotAvailableError(email);
    }
  }

  static async findByEmailAndPassword(email: string, password: string) {
    const user = await this.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }

    return null;
  }

  static async findById(id: number) {
    // const user = await this.findOne({ id });
    const user = await this
      .createQueryBuilder("users")
      .leftJoinAndSelect("users.activities", "activitie")
      .getOne();

    if (user) {
      return user;
    }

    return null;
  }
}

