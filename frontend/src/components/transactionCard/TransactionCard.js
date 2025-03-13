import { Card, Typography, Grid } from "@mui/material";

const TransactionCard = ({ transaction }) => {
  return (
    <Card variant="outlined" sx={{ padding: 1, mb: 1 }}>
    <Grid container spacing={2} S>
      <Grid item xs={4}> 
        <Typography variant="body1">
          <strong>Descrição:</strong> {transaction.description}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body1">
          <strong>CPF:</strong> {transaction.cpf}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body1">
          <strong>Data:</strong>{" "}
          {new Date(transaction.transaction_date).toLocaleDateString()}
        </Typography>
      </Grid>

      <Grid item xs={4}>
        <Typography variant="body1">
          <strong>Valor:</strong> R${" "}
          {Number(transaction.value).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body1">
          <strong>Pontos:</strong> {transaction.point_value}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color:
              transaction.status === "Aprovado"
                ? "green"
                : transaction.status === "Reprovado"
                ? "red"
                : "orange",
          }}
        >
          {transaction.status.toUpperCase()}
        </Typography>
      </Grid>
    </Grid>
  </Card>
);
};
  
export default TransactionCard;
