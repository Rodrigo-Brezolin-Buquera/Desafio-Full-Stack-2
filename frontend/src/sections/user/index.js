import React, {useState} from "react";
import { useProtectedPage } from "../../hooks/useProtectedPage";
import { useRequestData } from "../../hooks/useRequestData";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import TransactionCard from "../../components/transactionCard/TransactionCard";
import { useParams } from "react-router-dom";
import { useTransactionForm } from "./useTransactionForm";

export default function UserPage() {
  useProtectedPage();
  const { id } = useParams();
  const { data: userData, isLoading: userIsLoading } = useRequestData(
    `/user/${id}`
  );
  const [reloadTrigger, setReloadTrigger] = useState(true); 
  const { data: transactionList, isLoading: listIsloading } = useRequestData(
    `/transaction/${id}`, reloadTrigger
  );
  const { register, handleSubmit, onFormSubmit, errors } = useTransactionForm(id, setReloadTrigger);

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
      {userIsLoading ? (
        <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
          Painel do Usuário
        </Typography>
      ) : (
        <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
          Painel do {userData.name}
        </Typography>
      )}

      <Paper sx={{ p: 3, mb: 3, width: "100%" }}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Descrição"
                variant="outlined"
                fullWidth
                {...register("description", { required: "Campo obrigatório" })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Valor (R$)"
                type="number"
                variant="outlined"
                fullWidth
                {...register("value", {
                  required: "Campo obrigatório",
                  min: { value: 1, message: "O valor deve ser maior que 0" },
                })}
                error={!!errors.value}
                helperText={errors.value?.message}
              />
            </Grid>

            <Grid
              item
              xs={12}
              display={"flex"}
              justifyContent="center"
              alignItems="center"
              sm={4}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Cadastrar Transação
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Grid container spacing={3} sx={{ width: "100%" }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Lista de Transações</Typography>
            {listIsloading && <p>Carregando...</p>}
            <ul>
              {transactionList && transactionList.length > 0 ? (
                transactionList.map((t) => (
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
