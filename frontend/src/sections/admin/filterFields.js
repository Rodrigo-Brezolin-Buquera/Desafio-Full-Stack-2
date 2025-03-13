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
  <Paper sx={{ p: 3, mb: 3, width: "100%" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              label="CPF"
              variant="outlined"
              fullWidth
              value={values.cpf}
              onChange={(e) => handlers.handlecpf(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Produto"
              variant="outlined"
              fullWidth
              value={values.product}
              onChange={(e) => handlers.handleproduct(e.target.value)}
            />
          </Grid>
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
          <Grid item xs={12} sm={3}>
            <TextField
              label="Valor Mínimo"
              type="number"
              fullWidth
              value={values.minValue}
              onChange={(e) => handlers.handleminValue(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Valor Máximo"
              type="number"
              fullWidth
              value={values.maxValue}
              onChange={(e) => handlers.handlemaxValue(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button onClick={clearAll}>Limpar campos</Button>
        </Grid>
    </Paper>    
    )
}

