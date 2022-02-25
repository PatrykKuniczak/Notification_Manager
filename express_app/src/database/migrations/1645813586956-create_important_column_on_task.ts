import {MigrationInterface, QueryRunner} from "typeorm";

export class createImportantColumnOnTask1645813586956 implements MigrationInterface {
    name = 'createImportantColumnOnTask1645813586956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`important\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`important\``);
    }

}
