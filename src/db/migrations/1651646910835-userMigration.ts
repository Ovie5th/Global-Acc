import {MigrationInterface, QueryRunner} from "typeorm";

export class userMigration1651646910835 implements MigrationInterface {
    name = 'userMigration1651646910835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`episode\` ADD \`epicultue\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`episode\` DROP COLUMN \`epicultue\``);
    }

}
