import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";

import Auditorium from "./Auditorium";
import User from "./User";

@Entity("activities")
export default class Activitie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "timestamp" })
  startTime: Date;

  @Column({ type: "timestamp" })
  endTime: Date;

  @Column()
  vacancies: number;

  @ManyToOne(() => Auditorium, (auditorium: Auditorium) => auditorium.activities)
  auditorium: Auditorium;

  @ManyToMany(() => User)
  @JoinTable()
  users: [User];
}
