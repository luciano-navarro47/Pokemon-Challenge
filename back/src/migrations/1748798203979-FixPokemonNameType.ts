import { MigrationInterface, QueryRunner } from "typeorm";

export class FixPokemonNameType1748798203979 implements MigrationInterface {
    name = 'FixPokemonNameType1748798203979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_pokemon" ("id" varchar PRIMARY KEY NOT NULL, "name" integer NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "hp" integer NOT NULL, "speed" integer NOT NULL, "type" varchar NOT NULL, "imageUrl" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_pokemon"("id", "name", "attack", "defense", "hp", "speed", "type", "imageUrl") SELECT "id", "name", "attack", "defense", "hp", "speed", "type", "imageUrl" FROM "pokemon"`);
        await queryRunner.query(`DROP TABLE "pokemon"`);
        await queryRunner.query(`ALTER TABLE "temporary_pokemon" RENAME TO "pokemon"`);
        await queryRunner.query(`CREATE TABLE "temporary_pokemon" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "hp" integer NOT NULL, "speed" integer NOT NULL, "type" varchar NOT NULL, "imageUrl" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_pokemon"("id", "name", "attack", "defense", "hp", "speed", "type", "imageUrl") SELECT "id", "name", "attack", "defense", "hp", "speed", "type", "imageUrl" FROM "pokemon"`);
        await queryRunner.query(`DROP TABLE "pokemon"`);
        await queryRunner.query(`ALTER TABLE "temporary_pokemon" RENAME TO "pokemon"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemon" RENAME TO "temporary_pokemon"`);
        await queryRunner.query(`CREATE TABLE "pokemon" ("id" varchar PRIMARY KEY NOT NULL, "name" integer NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "hp" integer NOT NULL, "speed" integer NOT NULL, "type" varchar NOT NULL, "imageUrl" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "pokemon"("id", "name", "attack", "defense", "hp", "speed", "type", "imageUrl") SELECT "id", "name", "attack", "defense", "hp", "speed", "type", "imageUrl" FROM "temporary_pokemon"`);
        await queryRunner.query(`DROP TABLE "temporary_pokemon"`);
        await queryRunner.query(`ALTER TABLE "pokemon" RENAME TO "temporary_pokemon"`);
        await queryRunner.query(`CREATE TABLE "pokemon" ("id" varchar PRIMARY KEY NOT NULL, "name" integer NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "hp" integer NOT NULL, "speed" integer NOT NULL, "type" varchar NOT NULL, "imageUrl" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "pokemon"("id", "name", "attack", "defense", "hp", "speed", "type", "imageUrl") SELECT "id", "name", "attack", "defense", "hp", "speed", "type", "imageUrl" FROM "temporary_pokemon"`);
        await queryRunner.query(`DROP TABLE "temporary_pokemon"`);
    }

}
