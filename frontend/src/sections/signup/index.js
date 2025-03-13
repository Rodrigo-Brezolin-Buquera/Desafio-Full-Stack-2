import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { goTohome } from "../../router/coordinator";
import { useSignUpForm } from "./useSignUpForm";

export default function Signup() {
  const navigate = useNavigate();
  const {register, handleSubmit, onFormSubmit, errors  } = useSignUpForm(navigate)
 
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Cadastro
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onFormSubmit)} sx={{ mt: 2 }}>
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("name", { required: "Nome é obrigatório" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          
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
            {...register("password", { 
              required: "Senha é obrigatória", 
              minLength: { value: 6, message: "Senha deve ter pelo menos 6 caracteres"},
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

            <TextField
            label="CPF"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            {...register("cpf", { required: "CPF é obrigatório", 
              minLength: { value: 14, message: "CPF inválido. Use o formato XXX.XXX.XXX-XX."},
              maxLength: { value: 14, message: "CPF inválido. Use o formato XXX.XXX.XXX-XX."}
             })}
            error={!!errors.cpf}
            helperText={errors.cpf?.message}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Cadastrar
          </Button>

          <Typography
            variant="body2"
            sx={{ mt: 2, cursor: "pointer", color: "blue" }}
            onClick={() => goTohome(navigate)}
          >
            Já tem uma conta? Faça login.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
