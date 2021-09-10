import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllHotelRelatedTablesWithForeignKeys1631303014837 implements MigrationInterface {
    name = "CreateAllHotelRelatedTablesWithForeignKeys1631303014837"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"roomTypeHotel\" (\"id\" SERIAL NOT NULL, \"hotelId\" integer NOT NULL, \"roomTypeId\" integer NOT NULL, CONSTRAINT \"PK_a17136295d02c2b7c76f9dc469f\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"roomType\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"vacancies\" integer NOT NULL, \"roomsId\" integer, CONSTRAINT \"PK_136da3a78b9ecb12f0028a3030e\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"rooms\" (\"id\" SERIAL NOT NULL, \"number\" character varying NOT NULL, \"hotelId\" integer NOT NULL, \"roomTypeId\" integer NOT NULL, \"filledVacancies\" integer NOT NULL, CONSTRAINT \"PK_0368a2d7c215f2d0458a54933f2\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"hotel\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, CONSTRAINT \"PK_3a62ac86b369b36c1a297e9ab26\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"roomTypeHotel\" ADD CONSTRAINT \"FK_f4c55dc2789db64ca715a896081\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotel\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"roomTypeHotel\" ADD CONSTRAINT \"FK_b7c796e261dc4c4a5f445f8d115\" FOREIGN KEY (\"roomTypeId\") REFERENCES \"roomType\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"roomType\" ADD CONSTRAINT \"FK_7ad653ed7c2143edec623b932db\" FOREIGN KEY (\"roomsId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotel\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\"");
      await queryRunner.query("ALTER TABLE \"roomType\" DROP CONSTRAINT \"FK_7ad653ed7c2143edec623b932db\"");
      await queryRunner.query("ALTER TABLE \"roomTypeHotel\" DROP CONSTRAINT \"FK_b7c796e261dc4c4a5f445f8d115\"");
      await queryRunner.query("ALTER TABLE \"roomTypeHotel\" DROP CONSTRAINT \"FK_f4c55dc2789db64ca715a896081\"");
      await queryRunner.query("DROP TABLE \"hotel\"");
      await queryRunner.query("DROP TABLE \"rooms\"");
      await queryRunner.query("DROP TABLE \"roomType\"");
      await queryRunner.query("DROP TABLE \"roomTypeHotel\"");
    }
}
