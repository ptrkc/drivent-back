import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterBookingTableCreatePriceColumn1630696598659 implements MigrationInterface {
    name = "AlterBookingTableCreatePriceColumn1630696598659"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"bookings\" ADD \"price\" integer NOT NULL");
      await queryRunner.query("ALTER TABLE \"bookings\" ALTER COLUMN \"hasHotel\" DROP DEFAULT");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"bookings\" ALTER COLUMN \"hasHotel\" SET DEFAULT false");
      await queryRunner.query("ALTER TABLE \"bookings\" DROP COLUMN \"price\"");
    }
}
