import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useTheme,
  useMediaQuery,
  Fade,
} from "@mui/material";
import PokemonBattleCard from "./PokemonBattleCard";
import { Pokemon } from "../interfaces/Pokemon.interface";
import { useEffect, useRef, useState } from "react";
import cardBackImage from "../assets/backcard-pokemon.png";
import { startBattle } from "../services/pokemonService";
import { isEffective } from "../utils/isEffective";

type Props = {
  selected: Pokemon;
  opponent: Pokemon | null;
  pokemons: Pokemon[];
  setLoadingBattle: (value: boolean) => void;
  setOpponentPokemon: (pokemon: Pokemon | null) => void;
  setBattleResult: (text: string | null) => void;
  typeEffectiveness: string;
  setTypeEffectiveness: (text: string) => void;
};

export default function BattleArea({
  selected,
  opponent,
  pokemons,
  setLoadingBattle,
  setOpponentPokemon,
  setBattleResult,
  typeEffectiveness,
  setTypeEffectiveness
}: Props) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  
  // Countdown
  const [countdown, setCountdown] = useState<number>(3);
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const handlerStartClick = () => {
    if (isCounting) return;

    setTypeEffectiveness("");
    setLoadingBattle(true);
    setOpponentPokemon(null);
    setBattleResult(null);
    setCountdown(3);
    setIsCounting(true);
  };

  const handleStartBattle = async () => {
    if (!selected) return;

    const filtered = pokemons.filter((p) => p.id !== selected.id);
    const randomIndex = Math.floor(Math.random() * filtered.length);
    const randomOpponent = filtered[randomIndex];
    setOpponentPokemon(randomOpponent);
    setTypeEffectiveness(isEffective(selected, randomOpponent));

    try {
      const response = await startBattle({
        pokemon1Id: selected.id,
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

  useEffect(() => {
    if (!isCounting) return;

    timerRef.current = window.setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isCounting]);

  useEffect(() => {
    if (!isCounting) return;

    if (countdown <= 0) {
      setIsCounting(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      handleStartBattle();
    }
  }, [countdown, isCounting, handleStartBattle]);

  useEffect(() => {
    setTypeEffectiveness("");
  }, [selected]);

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
            <PokemonBattleCard
              pokemon={selected}
              typeEffectiveness={typeEffectiveness}
            />
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
            onClick={handlerStartClick}
            disabled={isCounting}
            sx={{ width: 140, height: 40, backgroundColor: "#377538" }}
          >
            {isCounting ? (
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
              <PokemonBattleCard
                pokemon={opponent}
                opponent={true}
                typeEffectiveness={typeEffectiveness}
              />
            </Box>
          ) : isCounting ? (
            <Fade in={isCounting} timeout={500}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 350,
                  height: 490,
                  borderRadius: 2,
                  backgroundColor: "#333",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={cardBackImage}
                  sx={{ width: 350, height: 490, objectFit: "cover" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1,
                    width: { xs: 80, md: 100 },
                    height: { xs: 80, md: 100 },
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    userSelect: "none",
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      color: "#fff",
                      fontSize: { xs: "4rem", md: "5rem" },
                      fontWeight: "bold",
                    }}
                  >
                    {countdown}
                  </Typography>
                </Box>
              </Box>
            </Fade>
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
