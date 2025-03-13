import React from "react";
import { useProtectedPage } from "../../hooks/useProtectedPage";
import { useRequestData } from "../../hooks/useRequestData";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import TransactionCard from "../../components/transactionCard/TransactionCard";
import { useFilters } from "./useFilters";

export default function AdminPage() {
  useProtectedPage();
  const { data, isLoading } = useRequestData("/transaction");
  const { filteredData, values, handlers, clearAll } = useFilters(data);

  return (
    <Container
      maxWidth="lg"
      sx={{
        minheight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
        Painel Administrativo
      </Typography>

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
              <MenuItem value="Pendente">Pendente</MenuItem>
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

      <Grid container spacing={3} sx={{ width: "100%" }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Lista de Transações</Typography>
            {isLoading && <p>Carregando...</p>}
            <ul>
              {data && data.length > 0 ? (
                filteredData.map((t) => (
                  <TransactionCard key={t.id} transaction={t} />
                ))
              ) : (
                <p>Nenhuma transação encontrada.</p>
              )}
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
