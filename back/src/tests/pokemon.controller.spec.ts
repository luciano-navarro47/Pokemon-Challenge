import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from '../controllers/pokemon.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pokemon } from '../entities/pokemon.entity';
import { Repository } from 'typeorm';

describe("PokemonController", () => {
  let controller: PokemonController;
  let repo: Repository<Pokemon>;

  const mockPokemons = [
    {
      id: 'pokemon-1',
      name: 'Pikachu',
      hp: 4,
      attack: 3,
      defense: 3,
      speed: 6,
      type: 'eletric',
      imageUrl: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png"
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        controllers: [PokemonController],
        providers: [
            {
                provide: getRepositoryToken(Pokemon),
                useValue: {
                    find: jest.fn(),
                },
            },
        ],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
    repo = module.get<Repository<Pokemon>>(getRepositoryToken(Pokemon));
  })

  it("should return all pokemons", async ()=> {
    jest.spyOn(repo, "find").mockResolvedValue(mockPokemons as Pokemon[]);
    const result = await controller.getAllPokemon();
    expect(result).toEqual(mockPokemons);
  })

  it("should throw if no pokemons found", async () =>{
    jest.spyOn(repo, "find").mockResolvedValue([]);
    await expect(controller.getAllPokemon()).rejects.toThrow("No pokemons found");
  })
});
