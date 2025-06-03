import { styled} from "@mui/material/styles";
import { Card, CardMedia, CardContent, Typography, Box, LinearProgress, Divider } from "@mui/material";
import { Pokemon } from "../interfaces/Pokemon.interface";

const MAX_STATS = 10;

const StatRow = styled(Box)({
    marginBottom: "0.9rem",
});

type Props = {
    pokemon: Pokemon;
}

export default function PokemonBattleCard({pokemon}: Props){

    const getStatPercentage = (statValue: number): number => {

        if(MAX_STATS <= 0) return 0;
        const pct = (statValue / MAX_STATS) * 100;
        if(pct < 0) return 0;
        if(pct > 100) return 100;
        return Math.round(pct);
    }

    return (
        <Card 
          sx={{
            width: 350, borderRadius: 2, boxShadow: 3}}>
            <CardMedia
                component="img"
                image={pokemon.imageUrl}
                alt={pokemon.name}
                sx={{height: { xs: 180, md: 220 }, objectFit: "contain"}}
            />

            <CardContent>
                <Typography variant="h5" gutterBottom align="left" >
                    {pokemon.name}
                </Typography>

                <Divider />

                <Box sx={{ mt: 1.5 }}>
                    {[
                        { label: "HP", value: pokemon.hp },
                        { label: "Attack", value: pokemon.attack },
                        { label: "Defense", value: pokemon.defense },
                        { label: "Speed", value: pokemon.speed },
                    ].map((stat) => (
                        
                        <StatRow key={stat.label}>
                            <Typography variant="body2">{stat.label}</Typography>
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
                                    boxShadow: 1
                                }}/>    
                        </StatRow>
                    ))}
                </Box>
            </CardContent>
        </Card>
    )
}