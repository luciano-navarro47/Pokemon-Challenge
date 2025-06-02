import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, LinearProgress} from "@mui/material";
import { styled} from "@mui/material/styles";
import { Pokemon } from "../interfaces/Pokemon.interface";

const StatRow = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "0.5rem",
})

type Props = {
    pokemon: Pokemon;
}

export default function PokemonBattleCard({pokemon}: Props){
    return (
        <Card sx={{width: 300, borderRadius: 4, boxShadow: 3}}>
            <CardMedia
                component="img"
                image={pokemon.imageUrl}
                alt={pokemon.name}
                sx={{height: 200, objectFit: "contain", backgroundColor: "white"}}
            />

            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {pokemon.name}
                </Typography>

                <Box sx={{ mt: 2}}>
                    <StatRow>
                        <Typography variant="body2">HP</Typography>
                        <LinearProgress variant="determinate" value={pokemon.hp} sx={{width: "70%"}}/>
                    </StatRow>

                    <StatRow>
                        <Typography variant="body2">Attack</Typography>
                        <LinearProgress variant="determinate" value={pokemon.attack} sx={{width: "70%"}}/>
                    </StatRow>

                    <StatRow>
                        <Typography variant="body2">Defense</Typography>
                        <LinearProgress variant="determinate" value={pokemon.defense} sx={{width: "70%"}}/>
                    </StatRow>

                    <StatRow>
                        <Typography variant="body2">Speed</Typography>
                        <LinearProgress variant="determinate" value={pokemon.speed} sx={{width: "70%"}}/>
                    </StatRow> 
                </Box>
            </CardContent>
        </Card>
    )
}