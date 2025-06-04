import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from '../entities/pokemon.entity';

@Controller('pokemon')
export class PokemonController {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
  ) {}
  @Get()
  async getAllPokemon() {
    try {
      const pokemons = await this.pokemonRepository.find();
      if (pokemons.length === 0) {
        throw new Error('No pokemons found');
      }
      return pokemons;
    } catch (error) {
      throw new Error(`Error fetching pokemons: ${error}`);
    }
  }
}
