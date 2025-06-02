import { Box, Stack, Typography } from "@mui/material";
import { PokemonCard } from "./PokemonCard";
import { Pokemon } from "../interfaces/Pokemon.interface";

type PokemonSelectorProps = {
  pokemons: Pokemon[];
};
export default function PokemonSelector({ pokemons }: PokemonSelectorProps) {
  return (
    <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gap={2}
    >
      <Typography variant="h3" align="left" gutterBottom>
        Battle of Pokémon
      </Typography>
      <Typography variant="h4" mb={2}>
        Select your Pokémon
      </Typography>
      <Stack direction="row" spacing={2} overflow="auto">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            name={pokemon.name}
            imageUrl={pokemon.imageUrl}
          />
        ))}
      </Stack>
    </Box>
  );
}
