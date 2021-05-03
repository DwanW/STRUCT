import {MigrationInterface, QueryRunner} from "typeorm";

export class ReviewVote1619998706225 implements MigrationInterface {
    name = 'ReviewVote1619998706225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_f095351fcb677419c4b4ecd2b04"`);
        await queryRunner.query(`CREATE TABLE "review_vote" ("value" integer NOT NULL, "userId" integer NOT NULL, "reviewId" integer NOT NULL, CONSTRAINT "PK_0279a09a8855cf2108365616b72" PRIMARY KEY ("userId", "reviewId"))`);
        await queryRunner.query(`ALTER TABLE "review_vote" ADD CONSTRAINT "FK_4de8aa192a7d2919b66ce83e6f8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review_vote" ADD CONSTRAINT "FK_f714bf883874fbd00b52bf16407" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_f095351fcb677419c4b4ecd2b04" FOREIGN KEY ("storyId") REFERENCES "story"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_f095351fcb677419c4b4ecd2b04"`);
        await queryRunner.query(`ALTER TABLE "review_vote" DROP CONSTRAINT "FK_f714bf883874fbd00b52bf16407"`);
        await queryRunner.query(`ALTER TABLE "review_vote" DROP CONSTRAINT "FK_4de8aa192a7d2919b66ce83e6f8"`);
        await queryRunner.query(`DROP TABLE "review_vote"`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_f095351fcb677419c4b4ecd2b04" FOREIGN KEY ("storyId") REFERENCES "story"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
