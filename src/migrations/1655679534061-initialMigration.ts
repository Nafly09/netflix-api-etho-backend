import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1655679534061 implements MigrationInterface {
    name = 'initialMigration1655679534061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`shows\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`director\` varchar(100) NOT NULL, \`actors\` varchar(200) NOT NULL, \`description\` longtext NOT NULL, \`cover\` varchar(200) NOT NULL, \`category\` enum ('MOVIE', 'TV_SHOWS') NOT NULL DEFAULT 'MOVIE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`episodes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`cover\` varchar(255) NOT NULL, \`duration\` int NOT NULL, \`showId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(100) NOT NULL, \`password\` varchar(100) NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_list_shows\` (\`usersId\` int NOT NULL, \`showsId\` int NOT NULL, INDEX \`IDX_ac9e54de3cd2958eaf6feda4e8\` (\`usersId\`), INDEX \`IDX_47b7c8896a9784ebdfc010a8f0\` (\`showsId\`), PRIMARY KEY (\`usersId\`, \`showsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`episodes\` ADD CONSTRAINT \`FK_3d3d8a6743e09a23b4b396ea7e4\` FOREIGN KEY (\`showId\`) REFERENCES \`shows\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_list_shows\` ADD CONSTRAINT \`FK_ac9e54de3cd2958eaf6feda4e8d\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_list_shows\` ADD CONSTRAINT \`FK_47b7c8896a9784ebdfc010a8f0e\` FOREIGN KEY (\`showsId\`) REFERENCES \`shows\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_list_shows\` DROP FOREIGN KEY \`FK_47b7c8896a9784ebdfc010a8f0e\``);
        await queryRunner.query(`ALTER TABLE \`users_list_shows\` DROP FOREIGN KEY \`FK_ac9e54de3cd2958eaf6feda4e8d\``);
        await queryRunner.query(`ALTER TABLE \`episodes\` DROP FOREIGN KEY \`FK_3d3d8a6743e09a23b4b396ea7e4\``);
        await queryRunner.query(`DROP INDEX \`IDX_47b7c8896a9784ebdfc010a8f0\` ON \`users_list_shows\``);
        await queryRunner.query(`DROP INDEX \`IDX_ac9e54de3cd2958eaf6feda4e8\` ON \`users_list_shows\``);
        await queryRunner.query(`DROP TABLE \`users_list_shows\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`episodes\``);
        await queryRunner.query(`DROP TABLE \`shows\``);
    }

}
