import {MigrationInterface, QueryRunner} from "typeorm";

export class entitiesMigration1651688632260 implements MigrationInterface {
    name = 'entitiesMigration1651688632260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`comment\` varchar(249) NOT NULL, \`ipAddressLocation\` varchar(255) NOT NULL, \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`episodeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`location\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`longitude\` double NOT NULL, \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`latitude\` double NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`character\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`status\` enum ('ACTIVE', 'DEAD', 'UNKNOWN') NOT NULL, \`gender\` enum ('MALE', 'FEMALE') NOT NULL, \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`locationId\` int NULL, UNIQUE INDEX \`REL_1a3e1657cef2f9158d3cb608df\` (\`locationId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`character_episodes_episode\` (\`characterId\` int NOT NULL, \`episodeId\` int NOT NULL, INDEX \`IDX_beae98fb8120fa5ab25567da6a\` (\`characterId\`), INDEX \`IDX_f73e945be228f2f8bea90ccd3d\` (\`episodeId\`), PRIMARY KEY (\`characterId\`, \`episodeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`episode\` DROP COLUMN \`character\``);
        await queryRunner.query(`ALTER TABLE \`episode\` DROP COLUMN \`epi\``);
        await queryRunner.query(`ALTER TABLE \`episode\` DROP COLUMN \`epicultue\``);
        await queryRunner.query(`ALTER TABLE \`episode\` DROP COLUMN \`location\``);
        await queryRunner.query(`ALTER TABLE \`episode\` ADD \`episodeCode\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`episode\` ADD \`releaseDate\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`episode\` ADD \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_a7db8d5243cfaa774fd44c82d3d\` FOREIGN KEY (\`episodeId\`) REFERENCES \`episode\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`character\` ADD CONSTRAINT \`FK_1a3e1657cef2f9158d3cb608df1\` FOREIGN KEY (\`locationId\`) REFERENCES \`location\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`character_episodes_episode\` ADD CONSTRAINT \`FK_beae98fb8120fa5ab25567da6ac\` FOREIGN KEY (\`characterId\`) REFERENCES \`character\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`character_episodes_episode\` ADD CONSTRAINT \`FK_f73e945be228f2f8bea90ccd3de\` FOREIGN KEY (\`episodeId\`) REFERENCES \`episode\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`character_episodes_episode\` DROP FOREIGN KEY \`FK_f73e945be228f2f8bea90ccd3de\``);
        await queryRunner.query(`ALTER TABLE \`character_episodes_episode\` DROP FOREIGN KEY \`FK_beae98fb8120fa5ab25567da6ac\``);
        await queryRunner.query(`ALTER TABLE \`character\` DROP FOREIGN KEY \`FK_1a3e1657cef2f9158d3cb608df1\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_a7db8d5243cfaa774fd44c82d3d\``);
        await queryRunner.query(`ALTER TABLE \`episode\` DROP COLUMN \`created\``);
        await queryRunner.query(`ALTER TABLE \`episode\` DROP COLUMN \`releaseDate\``);
        await queryRunner.query(`ALTER TABLE \`episode\` DROP COLUMN \`episodeCode\``);
        await queryRunner.query(`ALTER TABLE \`episode\` ADD \`location\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`episode\` ADD \`epicultue\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`episode\` ADD \`epi\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`episode\` ADD \`character\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_f73e945be228f2f8bea90ccd3d\` ON \`character_episodes_episode\``);
        await queryRunner.query(`DROP INDEX \`IDX_beae98fb8120fa5ab25567da6a\` ON \`character_episodes_episode\``);
        await queryRunner.query(`DROP TABLE \`character_episodes_episode\``);
        await queryRunner.query(`DROP INDEX \`REL_1a3e1657cef2f9158d3cb608df\` ON \`character\``);
        await queryRunner.query(`DROP TABLE \`character\``);
        await queryRunner.query(`DROP TABLE \`location\``);
        await queryRunner.query(`DROP TABLE \`comments\``);
    }

}
