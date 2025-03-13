import { TextField, Button, Box, Typography, Container, Paper, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { goToSignUpPage } from "../../router/coordinator";
import { useLoginForm } from "./useLoginForm";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState("")
  const {register, handleSubmit, onFormSubmit, errors  } = useLoginForm(navigate, setLoginError)


  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onFormSubmit)} sx={{ mt: 2 }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            {...register("email", { required: "Email é obrigatório" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Senha"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            {...register("password", { required: "Senha é obrigatória" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Entrar
          </Button>

          <Typography 
          variant="body2"
           sx={{ mt: 2, cursor: "pointer", color: "blue" }}
           onClick={()=>goToSignUpPage(navigate)}
           >
            Gostaria de cadastrar?
          </Typography>
        </Box>

        {loginError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {loginError}
          </Alert>
        )}
      </Paper>
    </Container>
  );
}
