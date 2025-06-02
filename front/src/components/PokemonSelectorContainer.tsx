import { useEffect, useState } from "react";

import PokemonSelector from "./PokemonSelector";
import { Pokemon } from "../interfaces/Pokemon.interface";
import { fetchPokemons } from "../services/pokemonService";

export default function PokemonSelectorContainer() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

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

  return <PokemonSelector pokemons={pokemons} />;
}
