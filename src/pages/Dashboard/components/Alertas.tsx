import {
  Box,
  Card,
  Chip,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import PrioridadeBadge from "../../../components/PrioridadeBadge";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import type { Prioridade } from "../../../components/PrioridadeBadge";

type Paciente = {
  nome: string;
};

type ChamadoAlerta = {
  id: number;
  paciente: Paciente;
  prioridade: Prioridade;
  sinaisAlerta: string[];
};

// eslint-disable-next-line react-refresh/only-export-components
export const alertas: ChamadoAlerta[] = [
  {
    id: 1,
    paciente: { nome: "João Silva" },
    prioridade: "vermelho",
    sinaisAlerta: ["Dor no peito", "Falta de ar"],
  },
  {
    id: 2,
    paciente: { nome: "Maria Souza" },
    prioridade: "laranja",
    sinaisAlerta: ["Febre alta", "Confusão mental"],
  },
  {
    id: 3,
    paciente: { nome: "Carlos Lima" },
    prioridade: "vermelho",
    sinaisAlerta: ["Desmaio", "Pressão baixa"],
  },
  {
    id: 4,
    paciente: { nome: "Ana Costa" },
    prioridade: "amarelo",
    sinaisAlerta: ["Tontura"],
  },
];

export const Alertas = () => {
  return (
    <Grid size={{ xs: 12, lg: 4 }}>
      <Card
        sx={{
          height: "100%",
          border: "1px solid",
          borderColor: "error.light",
          bgcolor: "#fef2f2",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, px: 2.5, py: 2 }}
        >
          <WarningAmberIcon sx={{ color: "error.main", fontSize: 20 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Sinais de Alerta
          </Typography>
        </Box>
        <Divider sx={{ borderColor: "error.light" }} />
        <List disablePadding>
          {alertas.map((c, i) => (
            <ListItemButton
              key={c.id}
              component={Link}
              to={`/chamados/${c.id}`}
              divider={i < alertas.length - 1}
              sx={{ "&:hover": { bgcolor: "#fee2e2" } }}
            >
              <ListItemText
                primary={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {c.paciente.nome}
                    </Typography>
                    <PrioridadeBadge prioridade={c.prioridade} />
                  </Box>
                }
                secondary={
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ mt: 0.5, flexWrap: "wrap" }}
                  >
                    {c.sinaisAlerta.map((s) => (
                      <Chip
                        key={s}
                        label={s}
                        size="small"
                        color="error"
                        variant="outlined"
                        sx={{ fontSize: "0.65rem", height: 20 }}
                      />
                    ))}
                  </Stack>
                }
              />
            </ListItemButton>
          ))}
        </List>
      </Card>
    </Grid>
  );
};
