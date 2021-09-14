import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";

import ActivitieAuditorium from "./ActivitieAuditorium";
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

  @ManyToOne(() => ActivitieAuditorium, (activitieAuditorium: ActivitieAuditorium) => activitieAuditorium.activities)
  activitieAuditorium: ActivitieAuditorium;

  @ManyToMany(() => User)
  @JoinTable()
  users: [User];
}
