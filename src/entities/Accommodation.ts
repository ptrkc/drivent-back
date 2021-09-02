import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("accommodation")
export default class Accommodation extends BaseEntity {
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
