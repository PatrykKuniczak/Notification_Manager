import {MigrationInterface, QueryRunner} from "typeorm";

export class changeTypeOfTypesColumn1648152604018 implements MigrationInterface {
    name = 'changeTypeOfTypesColumn1648152604018'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`taskType\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`taskType\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`type\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`type\` ADD \`name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`type\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`type\` ADD \`name\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`taskType\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`taskType\` text NOT NULL`);
    }

}
