import React from "react";
import { Typography, Box, Paper } from "@mui/material";

export const BalanceValue = ({ value }) => {
  return (
    <Paper sx={{ p: 1, mb: 1 }}>
      <Box sx={{ p: 1 }} display={"flex"}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Pontos Acumulados:
        </Typography>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {value}
        </Typography>
      </Box>
    </Paper>
  );
};
