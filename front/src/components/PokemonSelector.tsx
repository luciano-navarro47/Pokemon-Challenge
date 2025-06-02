// import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

import { PokemonCard } from "./PokemonCard";
import { Pokemon } from "../interfaces/Pokemon.interface";

type Props = {
  pokemons: Pokemon[];
  onSelect: (pokemon: Pokemon) => void;
  selectedId: string | null;
};
export default function PokemonSelector({ pokemons, onSelect, selectedId }: Props) {
  return (
    <Box
      sx={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h4">Battle of Pokémon</Typography>
        <Typography variant="h5" sx={{ mt: 3 }}>
          Select your Pokémon
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.2rem",
          mt: 1.5,
        }}
      >
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            name={pokemon.name}
            imageUrl={pokemon.imageUrl}
            onClick={() => onSelect(pokemon)}
            selected={pokemon.id === selectedId}
          />
        ))}
      </Box>
    </Box>
  );
}
