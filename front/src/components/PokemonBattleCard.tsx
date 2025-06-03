import { Card, CardMedia, CardContent, Typography, Box, LinearProgress} from "@mui/material";
import { styled} from "@mui/material/styles";
import { Pokemon } from "../interfaces/Pokemon.interface";

const StatRow = styled(Box)({
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "space-between",
    marginBottom: "1rem",
})

type Props = {
    pokemon: Pokemon;
}

export default function PokemonBattleCard({pokemon}: Props){
    return (
        <Card sx={{width:350, borderRadius: 2, boxShadow: 3}}>
            <CardMedia
                component="img"
                image={pokemon.imageUrl}
                alt={pokemon.name}
                sx={{height: 220, objectFit: "contain", backgroundColor: "whitea"}}
            />

            <CardContent>
                <Typography variant="h5" gutterBottom align="left">
                    {pokemon.name}
                </Typography>

                <Box sx={{ mt: 2 }}>
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
                                value={pokemon.hp} 
                                sx={{
                                    height: 10, 
                                    borderRadius: 5,
                                    backgroundColor: "#e0e0e0",
                                    "& .MuiLinearProgress-bar": {
                                        backgroundColor: "green",
                                    }
                                }}/>
                        </StatRow>
                    ))}
                </Box>
            </CardContent>
        </Card>
    )
}