import React from "react";
import { useProtectedPage } from "../../hooks/useProtectedPage";
import { useRequestData } from "../../hooks/useRequestData";
import {
  Container,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useFilters } from "./useFilters";
import { handleLogout } from "../../api/logout";
import { useNavigate } from "react-router-dom";
import { TransactionList } from "./transactionList";
import { FilterFields } from "./filterFields";

export default function AdminPage() {
  useProtectedPage();
  const { data, isLoading } = useRequestData("/transaction");
  const { filteredData, values, handlers, clearAll } = useFilters(data);
  const navigate = useNavigate();

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

      <FilterFields handlers={handlers} values={values} clearAll={clearAll} />

      <TransactionList isLoading={isLoading} list={filteredData} />
    </Container>
  );
}
