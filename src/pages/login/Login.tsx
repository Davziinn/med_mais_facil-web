import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

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
  Divider,
  Chip,
} from "@mui/material";

import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

import { MOCK_USERS, useAuth, type Role } from "../../contexts/AuthContext";

const HOME_BY_ROLE: Record<Role, string> = {
  medico: "/",
  recepcao: "/recepcao",
  adm: "/adm",
};

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  if (user) {
    return <Navigate to={HOME_BY_ROLE[user.role]} replace />;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErro(null);

    const res = login(email, senha);

    if (!res.ok) {
      setErro(res.error ?? "Erro ao entrar.");
      return;
    }

    const u = MOCK_USERS.find(
      (m) => m.email.toLowerCase() === email.trim().toLowerCase(),
    )!;

    navigate(HOME_BY_ROLE[u.role], { replace: true });
  };

  const preencher = (mockEmail: string, mockSenha: string) => {
    setEmail(mockEmail);
    setSenha(mockSenha);
    setErro(null);
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
        sx={{
          width: "100%",
          maxWidth: 440,
          borderRadius: 3,
          boxShadow: 6,
        }}
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <MonitorHeartIcon
                sx={{
                  color: "primary.main",
                  fontSize: 32,
                }}
              />

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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
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
                size="large"
                fullWidth
                sx={{
                  py: 1.2,
                  fontWeight: 600,
                }}
              >
                Entrar
              </Button>
            </Box>
          </form>

          <Divider sx={{ my: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Acessos de demonstração
            </Typography>
          </Divider>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {MOCK_USERS.map((u) => (
              <Box
                key={u.email}
                onClick={() => preencher(u.email, u.senha)}
                sx={{
                  p: 1.5,
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 2,
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",

                  "&:hover": {
                    borderColor: "primary.main",
                    bgcolor: "action.hover",
                  },
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {u.cargo}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {u.email} / {u.senha}
                  </Typography>
                </Box>

                <Chip
                  size="small"
                  label={u.role.toUpperCase()}
                  color={
                    u.role === "medico"
                      ? "primary"
                      : u.role === "recepcao"
                        ? "success"
                        : "warning"
                  }
                />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
