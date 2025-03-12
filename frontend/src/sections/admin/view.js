import React, { useState } from "react";
import { useProtectedPage } from "../../hooks/useProtectedPage";
import { useRequestData } from "../../hooks/useRequestData";
import { Container, Grid, Paper, Typography, Button } from "@mui/material";
import TransactionCard from "./transactionCard/TransactionCard";

export default function AdminPage() {
  useProtectedPage();
  const { data, isLoading } = useRequestData("/transaction");
  

  return (
    <Container
    maxWidth="lg"
    sx={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
      Painel Administrativo
    </Typography>

    <Grid container spacing={3} sx={{ width: "100%" }}>
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Lista de Transações</Typography>
          {isLoading && <p>Carregando...</p>}
          <ul>
            {data && data.length > 0 ? (
              data.map((t) => <TransactionCard key={t.id} transaction={t} />)
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
