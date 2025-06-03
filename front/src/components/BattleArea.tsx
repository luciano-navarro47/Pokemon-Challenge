import { Box, Button, CircularProgress } from "@mui/material";
import PokemonBattleCard from "./PokemonBattleCard";
import { Pokemon } from "../interfaces/Pokemon.interface";

type Props = {
  selected: Pokemon;
  opponent: Pokemon | null;
  onStartBattle: () => void;
  loadingBattle: boolean;
};

export default function BattleArea({
  selected,
  opponent,
  onStartBattle,
  loadingBattle,
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 4,
        mt: 4,
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <PokemonBattleCard pokemon={selected} />
      </Box>

      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={onStartBattle}
          disabled={loadingBattle}
          sx={{ mt: 2 }}
        >
          {loadingBattle ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Start Battle"
          )}
        </Button>
      </Box>

      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {opponent ? (
            <PokemonBattleCard pokemon={opponent}/>
        ) : (
            ""
        )}
      </Box>
    </Box>
  );
}
