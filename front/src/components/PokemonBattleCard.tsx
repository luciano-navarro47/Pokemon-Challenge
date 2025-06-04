import { styled } from "@mui/material/styles";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Divider,
  colors,
} from "@mui/material";
import { Pokemon } from "../interfaces/Pokemon.interface";

const MAX_STATS = 10;

const StatRow = styled(Box)({
  marginBottom: "0.9rem",
});

type StatLabel = {
  base: string;
  suffix?: string;
  suffixColor?: string;
  value: number;
};

type Props = {
  pokemon: Pokemon;
  typeEffectiveness: string;
  opponent?: boolean;
};

export default function PokemonBattleCard({
  pokemon,
  typeEffectiveness,
  opponent,
}: Props) {

  let statsLabels: StatLabel[] = [
    { base: "HP", value: pokemon.hp },
    {
      base: "Attack",
      suffix:
        typeEffectiveness === "critical"
          ? "- Critical impact!"
          : typeEffectiveness === "weak"
          ? "- Weak impact"
          : "",
      suffixColor:
        typeEffectiveness === "critical"
          ? colors.red[600]
          : typeEffectiveness === "weak"
          ? colors.blue[600]
          : undefined,
      value: pokemon.attack,
    },
    { base: "Defense", value: pokemon.defense },
    { base: "Speed", value: pokemon.speed },
  ];

  if (opponent) {
    statsLabels[1] = { base: "Attack", value: pokemon.attack };
  }
  const getStatPercentage = (statValue: number): number => {
    if (MAX_STATS <= 0) return 0;
    const pct = (statValue / MAX_STATS) * 100;
    if (pct < 0) return 0;
    if (pct > 100) return 100;
    return Math.round(pct);
  };

  return (
    <Card
      sx={{
        width: 350,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <CardMedia
        component="img"
        image={pokemon.imageUrl}
        alt={pokemon.name}
        sx={{ height: { xs: 180, md: 220 }, objectFit: "contain" }}
      />

      <CardContent>
        <Typography variant="h5" gutterBottom align="left">
          {pokemon.name}
        </Typography>

        <Divider />

        <Box sx={{ mt: 1.5 }}>
          {statsLabels.map((stat) => (
            <StatRow key={stat.base + (stat.suffix ?? "")}>
              <Typography variant="body2">
                {stat.base}
                {stat.suffix && (
                  <Typography
                    component="span"
                    sx={{ color: stat.suffixColor, ml: 1 }}
                  >
                    {stat.suffix}
                  </Typography>
                )}
              </Typography>

              <LinearProgress
                variant="determinate"
                value={getStatPercentage(stat.value)}
                sx={{
                  height: 12,
                  borderRadius: 5,
                  backgroundColor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#99FF33",
                  },
                  boxShadow: 1,
                }}
              />
            </StatRow>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
