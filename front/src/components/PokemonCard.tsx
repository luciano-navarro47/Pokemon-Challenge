import * as React from "react";
import { styled, useThemeProps } from "@mui/material/styles";
import { Box, Card, CardMedia, Typography, CardActionArea} from "@mui/material";

export interface PokemonCardProps {
    name: string;
    imageUrl: string;
    selected?: boolean;
    onClick?: () => void;
}

const StyledCard = styled(Card, {
    name: "PokemonCard",
    slot: "root",
})<{ selected?: boolean }>(({ theme, selected }) => ({
    width: 160,
    height: 150,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    border: selected ? `3px solid ${theme.palette.primary.main}` : '2px solid transparent',
    boxShadow: selected ? theme.shadows[4] : theme.shadows[5],
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    overflow: "hidden",
    '&:hover': {
        transform: 'scale(1.02)'
    }
}));

const StyledActionArea = styled(CardActionArea)({
    width: "100%",
    height: "100%",
})

const StyledName = styled(Typography)({
    textAlign: 'left',
    marginTop: 7,
    marginLeft: 7,
    fontSize: '1.1rem',
});

export const PokemonCard: React.FC<PokemonCardProps> = (inProps) => {
    const props = useThemeProps({ props: inProps, name: "PokemonCard" });
    const { name, imageUrl, selected, onClick } = props;

    return (
        <StyledCard selected={selected} onClick={onClick}>
            <StyledActionArea>
                <CardMedia 
                    component="img" 
                    image={imageUrl} 
                    alt={name} 
                    sx={{ 
                        height: "110px", 
                        objectFit: 'contain',
                    }} 
                    />
                <StyledName>{name}</StyledName>
            </StyledActionArea>
        </StyledCard>
    )
}