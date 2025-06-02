import * as React from "react";
import { styled, useThemeProps } from "@mui/material/styles";
import { Card, CardMedia, Typography, CardActionArea} from "@mui/material";

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
    width: 180,
    borderRadius: theme.shape.borderRadius * 2,
    border: selected ? `3px solid ${theme.palette.primary.main}` : '2px solid transparent',
    boxShadow: selected ? theme.shadows[4] : theme.shadows[1],
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
        transform: 'scale(1.03)'
    }
}));

const StyledName = styled(Typography)({
    textAlign: 'center',
    marginTop: 8,
    fontWeight: 600,
    fontSize: '1rem'
});

export const PokemonCard: React.FC<PokemonCardProps> = (inProps) => {
    const props = useThemeProps({ props: inProps, name: "PokemonCard" });
    const { name, imageUrl, selected, onClick } = props;

    return (
        <StyledCard selected={selected} onClick={onClick}>
            <CardActionArea>
                <CardMedia component="img" image={imageUrl} alt={name} sx={{ height: "120px         ", objectFit: 'contain' }} />
                <StyledName>{name}</StyledName>
            </CardActionArea>
        </StyledCard>
    )
}