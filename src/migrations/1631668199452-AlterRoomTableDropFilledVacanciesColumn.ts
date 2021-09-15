import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterRoomTableDropFilledVacanciesColumn1631668199452 implements MigrationInterface {
    name = "AlterRoomTableDropFilledVacanciesColumn1631668199452"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" DROP COLUMN \"filledVacancies\"");}

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" ADD \"filledVacancies\" integer NOT NULL");
    }
}
