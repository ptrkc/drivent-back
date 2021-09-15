import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterHotelTableCreateImageColumn1631600668553 implements MigrationInterface {
    name = "AlterHotelTableCreateImageColumn1631600668553"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"hotel\" ADD \"image\" character varying NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"hotel\" DROP COLUMN \"image\"");
    }
}
