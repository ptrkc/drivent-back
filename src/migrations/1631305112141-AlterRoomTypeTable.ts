import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterRoomTypeTable1631305112141 implements MigrationInterface {
    name = "AlterRoomTypeTable1631305112141"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"roomType\" DROP CONSTRAINT \"FK_7ad653ed7c2143edec623b932db\"");
      await queryRunner.query("ALTER TABLE \"roomType\" DROP COLUMN \"roomsId\"");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_76b20e23154532d6fc4a0f0ea27\" FOREIGN KEY (\"roomTypeId\") REFERENCES \"roomType\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_76b20e23154532d6fc4a0f0ea27\"");
      await queryRunner.query("ALTER TABLE \"roomType\" ADD \"roomsId\" integer");
      await queryRunner.query("ALTER TABLE \"roomType\" ADD CONSTRAINT \"FK_7ad653ed7c2143edec623b932db\" FOREIGN KEY (\"roomsId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
