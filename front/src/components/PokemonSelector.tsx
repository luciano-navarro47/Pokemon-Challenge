import { Box, Typography } from "@mui/material";
import { PokemonCard } from "./PokemonCard";
import { Pokemon } from "../interfaces/Pokemon.interface";

type Props = {
  pokemons: Pokemon[];
  onSelect: (pokemon: Pokemon) => void;
  selectedId: string | null;
};
export default function PokemonSelector({
  pokemons,
  onSelect,
  selectedId,
}: Props) {
  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">Select your Pokémon</Typography>
      </Box>

      <Box
        component="div"
        sx={(theme) => ({
          display: "grid",
          gap: theme.spacing(2),
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          }
        })}
      >
        {pokemons.map((pokemon) => (
          <Box>
            <PokemonCard
              name={pokemon.name}
              imageUrl={pokemon.imageUrl}
              onClick={() => onSelect(pokemon)}
              selected={pokemon.id === selectedId}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
