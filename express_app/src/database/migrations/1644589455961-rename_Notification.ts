import {MigrationInterface, QueryRunner} from "typeorm";

export class renameNotification1644589455961 implements MigrationInterface {
    name = 'renameNotification1644589455961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` CHANGE \`name\` \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`title\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` CHANGE \`title\` \`name\` varchar(255) NOT NULL`);
    }

}