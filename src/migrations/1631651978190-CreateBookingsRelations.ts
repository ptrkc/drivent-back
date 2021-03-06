import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBookingsRelations1631651978190 implements MigrationInterface {
    name = "CreateBookingsRelations1631651978190"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"bookings\" ADD \"roomId\" integer NOT NULL");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD CONSTRAINT \"FK_0172b36e4e054d6ebb819d58efb\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"bookings\" DROP CONSTRAINT \"FK_0172b36e4e054d6ebb819d58efb\"");
      await queryRunner.query("ALTER TABLE \"bookings\" DROP COLUMN \"roomId\"");
    }
}
