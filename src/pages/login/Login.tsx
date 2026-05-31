import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useAuth } from "../../contexts/AuthContext";
import type { AxiosError } from "axios";

const HOME_BY_ROLE: Record<string, string> = {
  MEDICO: "/",
  RECEPCAO: "/recepcao",
  ADMINISTRADOR: "/adm",
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro(null);
    setCarregando(true);

    try {
      // login() retorna o usuário já atualizado — não depende do estado
      const usuarioLogado = await login(email, senha);

      const roleKey = usuarioLogado.role;
      navigate(HOME_BY_ROLE[roleKey] ?? "/");
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 401) {
        setErro("Email ou senha incorretos.");
      } else if (axiosError.response?.status === 403) {
        setErro("Usuário desativado. Entre em contato com o administrador.");
      } else {
        setErro("Erro ao conectar com o servidor. Tente novamente.");
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Card
        sx={{ width: "100%", maxWidth: 440, borderRadius: 3, boxShadow: 6 }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <MonitorHeartIcon sx={{ color: "primary.main", fontSize: 32 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Med+Fácil
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Acesse sua conta para continuar
            </Typography>
          </Box>

          {erro && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {erro}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="E-mail"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                label="Senha"
                type={mostrarSenha ? "text" : "password"}
                fullWidth
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setMostrarSenha((v) => !v)}
                          edge="end"
                          size="small"
                        >
                          {mostrarSenha ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={carregando}
              >
                {carregando ? "Entrando..." : "Entrar"}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
