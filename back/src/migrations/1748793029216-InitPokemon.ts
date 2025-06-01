import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitPokemon1748793029216 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pokemon',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
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
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'imageUrl',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.query(`
        INSERT INTO pokemon (id, name, attack, defense, hp, speed, type, imageUrl) 
        VALUES
            ('pokemon-1', 'Pikachu', 4, 3, 3, 6, 'Electric', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png'),
            ('pokemon-2', 'Charmander', 4, 3, 3, 4, 'Fire', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png'),
            ('pokemon-3', 'Squirtle', 3, 4, 3, 3, 'Water', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png'),
            ('pokemon-4', 'Bulbasur', 4, 3, 3, 3, 'Grass', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png'),
            ('pokemon-5', 'Eevee', 4, 3, 4, 5, 'Normal', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/133.png');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pokemon');
  }
}
