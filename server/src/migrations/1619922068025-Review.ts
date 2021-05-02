import {MigrationInterface, QueryRunner} from "typeorm";

export class Review1619922068025 implements MigrationInterface {
    name = 'Review1619922068025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "review" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "type" character varying NOT NULL, "helpful_score" integer NOT NULL DEFAULT '0', "funny_score" integer NOT NULL DEFAULT '0', "unhelpful_score" integer NOT NULL DEFAULT '0', "userId" integer NOT NULL, "storyId" integer NOT NULL, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_f095351fcb677419c4b4ecd2b04" FOREIGN KEY ("storyId") REFERENCES "story"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_f095351fcb677419c4b4ecd2b04"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`);
        await queryRunner.query(`DROP TABLE "review"`);
    }

}
