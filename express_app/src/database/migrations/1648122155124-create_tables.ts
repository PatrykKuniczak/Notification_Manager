import {MigrationInterface, QueryRunner} from "typeorm";

export class whole1648122155124 implements MigrationInterface {
    name = 'create_tables1648122155124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`task\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`important\` tinyint NOT NULL, \`taskType\` varchar(255) NOT NULL, \`notificationDate\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER DATABASE \`todo\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`type\``);
        await queryRunner.query(`DROP TABLE \`task\``);
    }

}
