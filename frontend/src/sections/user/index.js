import React, { useState } from "react";
import { useProtectedPage } from "../../hooks/useProtectedPage";
import { useRequestData } from "../../hooks/useRequestData";
import { Container, Typography, Button, Box, Alert } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useTransactionForm } from "./useTransactionForm";
import { handleLogout } from "../../api/logout";
import { useFilters } from "./useFilters";
import { usePointBalance } from "./usePointBalance";
import { FilterFields } from "./filterFields";
import { TransactionList } from "./transactionList";
import { TransactionForm } from "./transactionForm";
import { BalanceValue } from "./balanceValue";

export default function UserPage() {
  useProtectedPage();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: userData, isLoading: userIsLoading } = useRequestData(
    `/user/${id}`
  );
  const [reloadTrigger, setReloadTrigger] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);
  const { data: transactionList, isLoading: listIsloading } = useRequestData(
    `/transaction/${id}`,
    reloadTrigger
  );

  const { register, handleSubmit, onFormSubmit, errors } = useTransactionForm(
    id,
    setErrorMessage,
    setReloadTrigger
  );
  const {
    filteredData: filteredList,
    values,
    handlers,
    clearAll,
  } = useFilters(transactionList);

  const { pointBalance } = usePointBalance(filteredList);

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
      {userIsLoading ? (
        <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
          Painel do Usuário
        </Typography>
      ) : (
        <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
          Painel do {userData.name}
        </Typography>
      )}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleLogout(navigate)}
        >
          Logout
        </Button>
      </Box>

      <TransactionForm
        register={register}
        handleSubmit={handleSubmit}
        onFormSubmit={onFormSubmit}
        errors={errors}
      />
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <FilterFields handlers={handlers} values={values} clearAll={clearAll} />
      <BalanceValue value={pointBalance} />

      <TransactionList isLoading={listIsloading} list={filteredList} />
    </Container>
  );
}
