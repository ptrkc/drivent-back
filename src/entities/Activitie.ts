import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";

import Auditorium from "./Auditorium";
import User from "./User";

@Entity("activities")
export default class Activitie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "timestamptz" })
  startTime: string;

  @Column({ type: "timestamptz" })
  endTime: string;

  @Column()
  vacancies: number;

  @ManyToOne(() => Auditorium, (auditorium: Auditorium) => auditorium.activities)
  auditorium: Auditorium;

  @ManyToMany(() => User)
  @JoinTable()
  users: [User];

  static async get() {
    return await this.find({ relations: ["auditorium", "users"], order: { id: "ASC" } });
  }

  static async findById(id: number) {
    return await this.findOne({ id });
  }
}
