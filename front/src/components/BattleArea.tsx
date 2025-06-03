import { Box, Button, CircularProgress, Typography, useTheme, useMediaQuery } from "@mui/material";
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

  const theme = useTheme();

  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (     
    <Box sx={{ width: "100%", mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMdUp ? "row" : "column",
          justifyContent: "center",
          alignItems: isMdUp ? "stretch" : "center",
          gap: isMdUp ? 4 : 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 350 }}>
            <PokemonBattleCard pokemon={selected} />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={onStartBattle}
            disabled={loadingBattle}
            sx={{ width: 140, height: 40, backgroundColor: "#377538" }}
          >
            {loadingBattle ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Start Battle"
            )}
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {opponent ? (
            <Box sx={{ width: "100%", maxWidth: 350 }}>
              <PokemonBattleCard pokemon={opponent} />
            </Box>
          ) : (
            <Box
              sx={{
                width: 300,
                maxWidth: 350,
                height: 490,
                border: "2px dashed #ccc",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body2" color="textSecondary">
                Random opponent
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
