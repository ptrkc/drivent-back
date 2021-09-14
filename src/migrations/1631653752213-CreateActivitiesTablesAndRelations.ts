import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateActivitiesTablesAndRelations1631653752213 implements MigrationInterface {
    name = "CreateActivitiesTablesAndRelations1631653752213"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"activitiesAuditoriums\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, CONSTRAINT \"PK_e9168526b18bc9d21117bfe87c1\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"activities\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"startTime\" TIMESTAMP NOT NULL, \"endTime\" TIMESTAMP NOT NULL, \"vacancies\" integer NOT NULL, \"activitieAuditoriumId\" integer, CONSTRAINT \"PK_7f4004429f731ffb9c88eb486a8\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"activities_users_users\" (\"activitiesId\" integer NOT NULL, \"usersId\" integer NOT NULL, CONSTRAINT \"PK_083d5f56038aa43e3260243a4a1\" PRIMARY KEY (\"activitiesId\", \"usersId\"))");
      await queryRunner.query("CREATE INDEX \"IDX_25f343ad52365e29de73e1feb5\" ON \"activities_users_users\" (\"activitiesId\") ");
      await queryRunner.query("CREATE INDEX \"IDX_829f79c5e4fa9e118d0759dbf3\" ON \"activities_users_users\" (\"usersId\") ");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_419e1f34739f83d497321b77a72\" FOREIGN KEY (\"activitieAuditoriumId\") REFERENCES \"activitiesAuditoriums\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"activities_users_users\" ADD CONSTRAINT \"FK_25f343ad52365e29de73e1feb5f\" FOREIGN KEY (\"activitiesId\") REFERENCES \"activities\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE");
      await queryRunner.query("ALTER TABLE \"activities_users_users\" ADD CONSTRAINT \"FK_829f79c5e4fa9e118d0759dbf37\" FOREIGN KEY (\"usersId\") REFERENCES \"users\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities_users_users\" DROP CONSTRAINT \"FK_829f79c5e4fa9e118d0759dbf37\"");
      await queryRunner.query("ALTER TABLE \"activities_users_users\" DROP CONSTRAINT \"FK_25f343ad52365e29de73e1feb5f\"");
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_419e1f34739f83d497321b77a72\"");
      await queryRunner.query("DROP INDEX \"IDX_829f79c5e4fa9e118d0759dbf3\"");
      await queryRunner.query("DROP INDEX \"IDX_25f343ad52365e29de73e1feb5\"");
      await queryRunner.query("DROP TABLE \"activities_users_users\"");
      await queryRunner.query("DROP TABLE \"activities\"");
      await queryRunner.query("DROP TABLE \"activitiesAuditoriums\"");
    }
}
