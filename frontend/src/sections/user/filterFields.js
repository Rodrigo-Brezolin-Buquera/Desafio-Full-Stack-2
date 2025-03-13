import React from "react";

import {
  Grid,
  Paper,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";


export const FilterFields = ({values, handlers, clearAll}) => {
  return (
    <Paper sx={{ p: 2, mb: 2, width: "100%" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Status"
              fullWidth
              value={values.status}
              onChange={(e) => handlers.handlestatus(e.target.value)}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="Aprovado">Aprovado</MenuItem>
              <MenuItem value="Reprovado">Reprovado</MenuItem>
              <MenuItem value="Em avaliação">Em avaliação</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="Data Inicial"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={values.startDate}
              onChange={(e) => handlers.handlestartDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Data Final"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={values.endDate}
              onChange={(e) => handlers.handleendDate(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button onClick={clearAll}>Limpar campos</Button>
        </Grid>
      </Paper>
    )
}

