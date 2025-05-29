import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitPokemon implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pokemon',
        columns: [
          {
            name: 'id',
            type: 'string',
            isPrimary: true,
            isGenerated: false,
          },
          {
            name: 'name',
            type: 'string',
            isNullable: false,
          },
          {
            name: 'attack',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'defense',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'hp',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'speed',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'string',
            isNullable: false,
          },
          {
            name: 'imageUrl',
            type: 'string',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pokemon');
  }
}
