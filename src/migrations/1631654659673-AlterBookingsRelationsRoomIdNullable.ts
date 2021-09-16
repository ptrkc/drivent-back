import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterBookingsRelationsRoomIdNullable1631654659673 implements MigrationInterface {
    name = "AlterBookingsRelationsRoomIdNullable1631654659673"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"bookings\" DROP CONSTRAINT \"FK_0172b36e4e054d6ebb819d58efb\"");
      await queryRunner.query("ALTER TABLE \"bookings\" ALTER COLUMN \"roomId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD CONSTRAINT \"FK_0172b36e4e054d6ebb819d58efb\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"bookings\" DROP CONSTRAINT \"FK_0172b36e4e054d6ebb819d58efb\"");
      await queryRunner.query("ALTER TABLE \"bookings\" ALTER COLUMN \"roomId\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD CONSTRAINT \"FK_0172b36e4e054d6ebb819d58efb\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
