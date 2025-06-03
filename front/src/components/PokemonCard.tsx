import { styled } from "@mui/material/styles";
import { Card, CardMedia, Typography, CardActionArea} from "@mui/material";

export interface Props {
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
    borderRadius: 8,
    border: selected ? `2px solid green` : "2px solid transparent",
    boxShadow: selected ? theme.shadows[4] : theme.shadows[5],
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

export const PokemonCard: React.FC<Props> = (props) => {
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