import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateActivitiesTablesAndRelations1631756149422 implements MigrationInterface {
    name = "CreateActivitiesTablesAndRelations1631756149422"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities_users_users\" DROP CONSTRAINT \"FK_829f79c5e4fa9e118d0759dbf37\"");
      await queryRunner.query("ALTER TABLE \"activities_users_users\" ADD CONSTRAINT \"FK_829f79c5e4fa9e118d0759dbf37\" FOREIGN KEY (\"usersId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities_users_users\" DROP CONSTRAINT \"FK_829f79c5e4fa9e118d0759dbf37\"");
      await queryRunner.query("ALTER TABLE \"activities_users_users\" ADD CONSTRAINT \"FK_829f79c5e4fa9e118d0759dbf37\" FOREIGN KEY (\"usersId\") REFERENCES \"users\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE");
    }
}
