import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import Activitie from "./Activitie";

@Entity("activitiesAuditoriums")
export default class ActivitieAuditorium extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Activitie, (activities: Activitie) => activities.activitieAuditorium)
  activities: [Activitie];
}
