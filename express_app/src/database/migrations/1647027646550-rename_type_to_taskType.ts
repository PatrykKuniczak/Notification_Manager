import {MigrationInterface, QueryRunner} from "typeorm";

export class renameTypeToTaskType1647027646550 implements MigrationInterface {
    name = 'renameTypeToTaskType1647027646550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`type\` \`taskType\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`taskType\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`taskType\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`taskType\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`taskType\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`taskType\` \`type\` varchar(255) NOT NULL`);
    }

}
