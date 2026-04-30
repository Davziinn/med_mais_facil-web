import {
  Box,
  Card,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import StatusBadge, {
  type ChamadoStatus,
} from "../../../components/StatusBadge";
import { Link } from "react-router-dom";

type Paciente = {
  nome: string;
  idade: number;
};

type Chamado = {
  id: number;
  paciente: Paciente;
  queixaPrincipal: string;
  status: ChamadoStatus;
};

// eslint-disable-next-line react-refresh/only-export-components
export const emAtendimento: Chamado[] = [
  {
    id: 1,
    paciente: { nome: "Lucas Andrade", idade: 32 },
    queixaPrincipal: "Dor no peito",
    status: "EM_ATENDIMENTO",
  },
  {
    id: 2,
    paciente: { nome: "Fernanda Lima", idade: 27 },
    queixaPrincipal: "Falta de ar",
    status: "EM_ATENDIMENTO",
  },
  {
    id: 3,
    paciente: { nome: "Ricardo Souza", idade: 45 },
    queixaPrincipal: "Tontura",
    status: "CANCELADO",
  },
];

export const EmAtendimento = () => {
  return (
    <Grid size={{ xs: 12, lg: 4 }}>
      <Card sx={{ height: "100%" }}>
        <Box sx={{ px: 2.5, py: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Em Atendimento
          </Typography>
        </Box>
        <Divider />
        {emAtendimento.length === 0 ? (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Nenhum atendimento em andamento
            </Typography>
          </Box>
        ) : (
          <List disablePadding>
            {emAtendimento.map((c, i) => (
              <ListItemButton
                key={c.id}
                component={Link}
                to={`/chamados/${c.id}`}
                divider={i < emAtendimento.length - 1}
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
                      <StatusBadge status={c.status} />
                    </Box>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {c.queixaPrincipal} · {c.paciente.idade} anos
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
          </List>
        )}
      </Card>
    </Grid>
  );
};
