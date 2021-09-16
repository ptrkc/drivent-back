import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import Activitie from "./Activitie";

@Entity("auditoriums")
export default class Auditorium extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Activitie, (activities: Activitie) => activities.auditorium)
  activities: [Activitie];
}
