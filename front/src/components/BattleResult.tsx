import { Box, Fade, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = {
  winnerText: string;
};

const StyledBattleResult = styled(Box)(({ theme }) => ({
  padding: "10px",
  backgroundColor: "#e4f9fe",
  borderRadius: 5,
  border: "2px solid black",
  boxShadow: theme.shadows[2],
}));

export default function BattleResult({ winnerText }: Props) {
  return (
    <Fade in={winnerText != ""} timeout={500}>
      <StyledBattleResult>
        <Typography variant="h6" sx={{ marginLeft: 1.5 }}>
          {winnerText}
        </Typography>
      </StyledBattleResult>
    </Fade>
  );
}
