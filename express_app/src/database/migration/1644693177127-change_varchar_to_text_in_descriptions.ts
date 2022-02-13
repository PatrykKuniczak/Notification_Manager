import {MigrationInterface, QueryRunner} from "typeorm";

export class changeVarcharToTextInDescriptions1644693177127 implements MigrationInterface {
    name = 'changeVarcharToTextInDescriptions1644693177127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`description\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`description\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`description\` varchar(255) NOT NULL`);
    }

}