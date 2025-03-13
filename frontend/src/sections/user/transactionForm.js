import React from 'react'
import {
    Grid,
    Paper,
    Button,
    TextField,
  } from "@mui/material";
  
export const TransactionForm = ({handleSubmit, onFormSubmit, register, errors}) => {
  return (
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
  )
}
