import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("ticketTypes")
export default class TicketType extends BaseEntity {
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
