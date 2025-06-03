import React, { useEffect, useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import PokemonSelector from "./PokemonSelector";
import BattleArea from "./BattleArea";
import BattleResult from "./BattleResult";
import { Pokemon } from "../interfaces/Pokemon.interface";
import { fetchPokemons, startBattle } from "../services/pokemonService";

export default function PokemonBattleContainer() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [opponentPokemon, setOpponentPokemon] = useState<Pokemon | null>(null);
  const [battleResult, setBattleResult] = useState<string | null>(null);
  const [loadingBattle, setLoadingBattle] = useState(false);

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
    setSelectedPokemon(poke);
    setOpponentPokemon(null);
    setBattleResult(null);
  };

  const handleStartBattle = async () => {
    if (!selectedPokemon) return;
    setLoadingBattle(true);

    const filtered = pokemons.filter((p) => p.id !== selectedPokemon.id);
    const randomIndex = Math.floor(Math.random() * filtered.length);
    const randomOpponent = filtered[randomIndex];
    setOpponentPokemon(randomOpponent);

    try {
      const response = await startBattle({
        pokemon1Id: selectedPokemon.id,
        pokemon2Id: randomOpponent.id,
      });

      setBattleResult(`${response.winner.name} wins!`);
    } catch (error) {
      console.error("Error during the start battle: ", error);
      setBattleResult("Error during battle. Try again.");
    } finally {
      setLoadingBattle(false);
    }
  };

  if (loadingList) return <div>Loading pokémons...</div>;

  return (
    <Container maxWidth="md" disableGutters>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4">Battle of Pokémon</Typography>
      </Box>

      <PokemonSelector
        pokemons={pokemons}
        onSelect={handleSelectPokemon}
        selectedId={selectedPokemon ? selectedPokemon.id : null}
      />

      {battleResult && <BattleResult winnerText={battleResult} />}

      {selectedPokemon && (
        <BattleArea
          selected={selectedPokemon}
          opponent={opponentPokemon}
          onStartBattle={handleStartBattle}
          loadingBattle={loadingBattle}
        />
      )}
    </Container>
  );
}
