import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelationBookingRoomBookingHotel1631602969770 implements MigrationInterface {
    name = "CreateRelationBookingRoomBookingHotel1631602969770"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"bookings\" ADD \"hotelId\" integer NOT NULL");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD \"roomId\" integer NOT NULL");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD CONSTRAINT \"FK_6713f297621b99988068dd63fe5\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotel\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD CONSTRAINT \"FK_0172b36e4e054d6ebb819d58efb\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"bookings\" DROP CONSTRAINT \"FK_0172b36e4e054d6ebb819d58efb\"");
      await queryRunner.query("ALTER TABLE \"bookings\" DROP CONSTRAINT \"FK_6713f297621b99988068dd63fe5\"");
      await queryRunner.query("ALTER TABLE \"bookings\" DROP COLUMN \"roomId\"");
      await queryRunner.query("ALTER TABLE \"bookings\" DROP COLUMN \"hotelId\"");
    }
}
