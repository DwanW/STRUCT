import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingField1619122717344 implements MigrationInterface {
    name = 'AddingField1619122717344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar_url" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar_url"`);
    }

}
