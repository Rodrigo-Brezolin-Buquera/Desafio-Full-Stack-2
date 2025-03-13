import React from 'react'

import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import TransactionCard from "../../components/transactionCard/TransactionCard";


export const TransactionList = ({list, isLoading}) => {
  return (
    <Grid container spacing={3} sx={{ width: "100%" }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Lista de Transações</Typography>
            {isLoading && <p>Carregando...</p>}
            <ul>
              {list && list.length > 0 ? (
                list.map((t) => (
                  <TransactionCard key={t.id} transaction={t} />
                ))
              ) : (
                <p>Nenhuma transação encontrada.</p>
              )}
            </ul>
          </Paper>
        </Grid>
      </Grid>
  )
}

