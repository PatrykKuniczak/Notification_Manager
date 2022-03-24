import {MigrationInterface, QueryRunner} from "typeorm";

export class changeTypeOfTask1648145622013 implements MigrationInterface {
    name = 'changeTypeOfTask1648145622013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`taskType\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`taskType\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`taskType\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`taskType\` varchar(255) NOT NULL`);
    }

}
