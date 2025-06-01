import { MigrationInterface, QueryRunner } from "typeorm";

export class InitBattleResult1748795791008 implements MigrationInterface {
    name = 'InitBattleResult1748795791008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_pokemon" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "hp" integer NOT NULL, "speed" integer NOT NULL, "type" varchar NOT NULL, "imageUrl" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_pokemon"("id", "name", "attack", "defense", "hp", "speed", "type", "imageUrl") SELECT "id", "name", "attack", "defense", "hp", "speed", "type", "imageUrl" FROM "pokemon"`);
        await queryRunner.query(`DROP TABLE "pokemon"`);
        await queryRunner.query(`ALTER TABLE "temporary_pokemon" RENAME TO "pokemon"`);
        await queryRunner.query(`CREATE TABLE "battle_result" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "winner_name" varchar NOT NULL, "loser_name" varchar NOT NULL, "turns" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "winner_id" varchar, "loser_id" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_pokemon" ("id" varchar PRIMARY KEY NOT NULL, "name" integer NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "hp" integer NOT NULL, "speed" integer NOT NULL, "type" varchar NOT NULL, "imageUrl" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_pokemon"("id", "name", "attack", "defense", "hp", "speed", "type", "imageUrl") SELECT "id", "name", "attack", "defense", "hp", "speed", "type", "imageUrl" FROM "pokemon"`);
        await queryRunner.query(`DROP TABLE "pokemon"`);
        await queryRunner.query(`ALTER TABLE "temporary_pokemon" RENAME TO "pokemon"`);
        await queryRunner.query(`CREATE TABLE "temporary_battle_result" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "winner_name" varchar NOT NULL, "loser_name" varchar NOT NULL, "turns" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "winner_id" varchar, "loser_id" varchar, CONSTRAINT "FK_71fdc1aec6bd3ea00848df4186b" FOREIGN KEY ("winner_id") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b1b9d845233dd2296795c3309eb" FOREIGN KEY ("loser_id") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_battle_result"("id", "winner_name", "loser_name", "turns", "created_at", "deleted_at", "winner_id", "loser_id") SELECT "id", "winner_name", "loser_name", "turns", "created_at", "deleted_at", "winner_id", "loser_id" FROM "battle_result"`);
        await queryRunner.query(`DROP TABLE "battle_result"`);
        await queryRunner.query(`ALTER TABLE "temporary_battle_result" RENAME TO "battle_result"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "battle_result" RENAME TO "temporary_battle_result"`);
        await queryRunner.query(`CREATE TABLE "battle_result" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "winner_name" varchar NOT NULL, "loser_name" varchar NOT NULL, "turns" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "winner_id" varchar, "loser_id" varchar)`);
        await queryRunner.query(`INSERT INTO "battle_result"("id", "winner_name", "loser_name", "turns", "created_at", "deleted_at", "winner_id", "loser_id") SELECT "id", "winner_name", "loser_name", "turns", "created_at", "deleted_at", "winner_id", "loser_id" FROM "temporary_battle_result"`);
        await queryRunner.query(`DROP TABLE "temporary_battle_result"`);
        await queryRunner.query(`ALTER TABLE "pokemon" RENAME TO "temporary_pokemon"`);
        await queryRunner.query(`CREATE TABLE "pokemon" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "hp" integer NOT NULL, "speed" integer NOT NULL, "type" varchar NOT NULL, "imageUrl" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "pokemon"("id", "name", "attack", "defense", "hp", "speed", "type", "imageUrl") SELECT "id", "name", "attack", "defense", "hp", "speed", "type", "imageUrl" FROM "temporary_pokemon"`);
        await queryRunner.query(`DROP TABLE "temporary_pokemon"`);
        await queryRunner.query(`DROP TABLE "battle_result"`);
        await queryRunner.query(`ALTER TABLE "pokemon" RENAME TO "temporary_pokemon"`);
        await queryRunner.query(`CREATE TABLE "pokemon" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "hp" integer NOT NULL, "speed" integer NOT NULL, "type" varchar NOT NULL, "imageUrl" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "pokemon"("id", "name", "attack", "defense", "hp", "speed", "type", "imageUrl") SELECT "id", "name", "attack", "defense", "hp", "speed", "type", "imageUrl" FROM "temporary_pokemon"`);
        await queryRunner.query(`DROP TABLE "temporary_pokemon"`);
    }

}
