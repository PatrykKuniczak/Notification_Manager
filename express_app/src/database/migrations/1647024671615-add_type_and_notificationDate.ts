import {MigrationInterface, QueryRunner} from "typeorm";

export class removeNotificationAndAddTypeAndNotificationDate1647024671615 implements MigrationInterface {
    name = 'removeNotificationAndAddTypeAndNotificationDate1647024671615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`type\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`notificationDate\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`notificationDate\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`type\``);
    }

}
