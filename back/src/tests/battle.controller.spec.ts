import { Test, TestingModule } from '@nestjs/testing';
import { BattleController } from '../controllers/battle.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pokemon } from '../entities/pokemon.entity';
import { BattleResult } from '../entities/battle-result.entity';
import { Repository } from 'typeorm';

describe('BattleController', () => {
  let controller: BattleController;
  let resultRepo: Repository<BattleResult>;
  let pokemonRepo: Repository<Pokemon>;

  const pokemon1: Pokemon = {
    id: 'pokemon-1',
    name: 'Pikachu',
    hp: 4,
    attack: 3,
    defense: 3,
    speed: 6,
    type: 'eletric',
    imageUrl:
      'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png',
  };

  const pokemon2: Pokemon = {
    id: 'pokemon-2',
    name: 'Charmander',
    hp: 4,
    attack: 3,
    defense: 3,
    speed: 4,
    type: 'fire',
    imageUrl:
      'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        controllers: [BattleController],
        providers: [
            {
                provide: getRepositoryToken(Pokemon),
                useValue: {
                    findOne: jest.fn()
                }
            },
            {
                provide: getRepositoryToken(BattleResult),
                useValue: {
                    create: jest.fn().mockImplementation((data) => data),
                    save: jest.fn()
                }
            }
        ],
    }).compile();

    controller = module.get<BattleController>(BattleController);
    resultRepo = module.get(getRepositoryToken(BattleResult));
    pokemonRepo = module.get(getRepositoryToken(Pokemon));
  });

  it("should return winner if both pokemons exists", async () => {
    jest.spyOn(pokemonRepo, "findOne").mockImplementation(({where}: { where: {id: string}}) => {
        if(where?.id === "pokemon-1") return Promise.resolve({...pokemon1})
        if(where?.id === "pokemon-2") return Promise.resolve({...pokemon2})
        return Promise.resolve(null);
    })

    const result = await controller.battle({ pokemon1Id: "pokemon-1", pokemon2Id: "pokemon-2"});

    expect(result).toHaveProperty("winner");
    expect(["Pikachu", "Charmander"]).toContain(result.winner?.name);
    expect(resultRepo.save).toHaveBeenCalled();
  })

  it("should return error message if one or both pokemon not found", async () =>{
    jest.spyOn(pokemonRepo, "findOne").mockResolvedValueOnce(null);

    const result = await controller.battle({ pokemon1Id: "pokemon-1", pokemon2Id: "pokemon-2"});
    expect(result).toEqual({ message: "One or both pokemons not found."});
  })
});
