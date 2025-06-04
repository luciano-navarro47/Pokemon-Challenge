import { useEffect, useState } from "react";
import { Container, Box, Typography } from "@mui/material";

import BattleArea from "./BattleArea";
import BattleResult from "./BattleResult";
import PokemonSelector from "./PokemonSelector";
import { Pokemon } from "../interfaces/Pokemon.interface";
import { fetchPokemons } from "../services/pokemonService";

export default function PokemonBattleContainer() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [opponentPokemon, setOpponentPokemon] = useState<Pokemon | null>(null);

  const [battleResult, setBattleResult] = useState<string | null>(null);
  const [loadingBattle, setLoadingBattle] = useState(false);

  const [typeEffectiveness, setTypeEffectiveness] = useState("");
  useEffect(() => {
    async function fetchedPokes() {
      const pokes = await fetchPokemons();

      if (pokes.length > 0) {
        setPokemons(pokes);
        setLoadingList(false);
      }
    }

    fetchedPokes();
  }, []);

  const handleSelectPokemon = (poke: Pokemon) => {
    setTypeEffectiveness("");
    setSelectedPokemon(poke);
    setOpponentPokemon(null);
    setBattleResult(null);
  };

  if (loadingList) return <div>Loading pokémons...</div>;

  return (
    <Container>
      <Container maxWidth="md" disableGutters>
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h4">Battle of Pokémon</Typography>
        </Box>

        <PokemonSelector
          pokemons={pokemons}
          onSelect={handleSelectPokemon}
          selectedId={selectedPokemon ? selectedPokemon.id : null}
          disabled={loadingBattle}
        />

        {battleResult && <BattleResult winnerText={battleResult} />}

        {selectedPokemon && (
          <BattleArea
            selected={selectedPokemon}
            opponent={opponentPokemon}
            pokemons={pokemons}
            setLoadingBattle={setLoadingBattle}
            setOpponentPokemon={setOpponentPokemon}
            setBattleResult={setBattleResult}
            typeEffectiveness={typeEffectiveness}
            setTypeEffectiveness={setTypeEffectiveness}
          />
        )}
      </Container>
    </Container>
  );
}
