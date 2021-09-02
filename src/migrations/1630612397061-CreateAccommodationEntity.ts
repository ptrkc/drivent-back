import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAccommodationEntity1630612397061 implements MigrationInterface {
    name = "CreateAccommodationEntity1630612397061"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"accommodation\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"price\" integer NOT NULL, CONSTRAINT \"PK_2c4c7f0aaccd4ff2238559a617c\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("INSERT INTO \"accommodation\" (name, price) VALUES ('Sem Hotel', 0), ('Com Hotel', 350)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("DROP TABLE \"accommodation\"");
    }
}
