import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = {
    winnerText: string;
}

const StyledBattleResult = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1.5),
    backgroundColor: "#e4f9fe",
    borderRadius: 5,
    border: "1.5px solid black",
    boxShadow: theme.shadows[2], 
    width: "87.5%",
    alignSelf: "center"
  }));

export default function BattleResult({ winnerText }: Props){
    return (
        <StyledBattleResult>
            <Typography variant="h6" sx={{marginLeft: 1.5}}>{winnerText}</Typography>
        </StyledBattleResult>
    )
}