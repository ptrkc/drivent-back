import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBookingsEntity1630669435663 implements MigrationInterface {
    name = "CreateBookingsEntity1630669435663"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"bookings\" (\"id\" SERIAL NOT NULL, \"isOnline\" boolean NOT NULL, \"hasHotel\" boolean NOT NULL DEFAULT false, \"isPaid\" boolean NOT NULL DEFAULT false, \"userId\" integer NOT NULL, CONSTRAINT \"REL_38a69a58a323647f2e75eb994d\" UNIQUE (\"userId\"), CONSTRAINT \"PK_bee6805982cc1e248e94ce94957\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD CONSTRAINT \"FK_38a69a58a323647f2e75eb994de\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"bookings\" DROP CONSTRAINT \"FK_38a69a58a323647f2e75eb994de\"");
      await queryRunner.query("DROP TABLE \"bookings\"");
    }
}
