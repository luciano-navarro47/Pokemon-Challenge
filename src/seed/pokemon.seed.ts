import { DataSource } from 'typeorm';
import { Pokemon } from '../entities/pokemon.entity';
import pokemons from '../data/pokemon.json';

export async function seedPokemon(dataSource: DataSource) {
    const pokemonRepository = dataSource.getRepository(Pokemon);

    for (const pokemon of pokemons.pokemon) {
        const exists = await pokemonRepository.findOneBy({ id: pokemon.id})

        if (!exists){
            const newPokemon = pokemonRepository.create(pokemon);
            await pokemonRepository.save(newPokemon);
        }
    }

    console.log('Pokemon seed completed');
}