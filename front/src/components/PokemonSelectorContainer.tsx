import { useEffect, useState } from "react";

import PokemonSelector from "./PokemonSelector";
import { Pokemon } from "../interfaces/Pokemon.interface";
import { fetchPokemons } from "../services/pokemonService";

export default function PokemonSelectorContainer() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  
  useEffect(() => {
    async function fetchedPokes() {
      const pokes = await fetchPokemons();

      if (pokes.length > 0) {
        setPokemons(pokes);
        setLoading(false);
      }
    }

    fetchedPokes();
  }, []);

  if (loading) return <div>Loading pokemons...</div>;

  const handleSelectPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  }

  return (
    <PokemonSelector 
        pokemons={pokemons}
        onSelect={handleSelectPokemon}
        selectedId={selectedPokemon ? selectedPokemon.id : null}
    />
  );
}
