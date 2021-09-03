import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tickets")
export default class Tickets extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  static async get() {
    return await this.find();
  }
}
