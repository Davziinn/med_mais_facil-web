import {
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PrioridadeBadge from "../../../components/PrioridadeBadge";

import type { Prioridade } from "../../../components/PrioridadeBadge";

type Paciente = {
  nome: string;
};

type Chamado = {
  id: number;
  senha: string;
  paciente: Paciente;
  queixaPrincipal: string;
  prioridade: Prioridade;
};

// eslint-disable-next-line react-refresh/only-export-components
export const aguardando: Chamado[] = [
  {
    id: 1,
    senha: "A001",
    paciente: { nome: "João Silva" },
    queixaPrincipal: "Dor no peito",
    prioridade: "vermelho",
  },
  {
    id: 2,
    senha: "A002",
    paciente: { nome: "Maria Souza" },
    queixaPrincipal: "Febre alta",
    prioridade: "laranja",
  },
  {
    id: 3,
    senha: "A003",
    paciente: { nome: "Carlos Lima" },
    queixaPrincipal: "Dor de cabeça",
    prioridade: "amarelo",
  },
  {
    id: 4,
    senha: "A004",
    paciente: { nome: "Ana Costa" },
    queixaPrincipal: "Tontura",
    prioridade: "verde",
  },
  {
    id: 5,
    senha: "A005",
    paciente: { nome: "Pedro Santos" },
    queixaPrincipal: "Falta de ar",
    prioridade: "vermelho",
  },
  {
    id: 6,
    senha: "A006",
    paciente: { nome: "Juliana Alves" },
    queixaPrincipal: "Dor abdominal",
    prioridade: "amarelo",
  },
];

export const FilaDeEspera = () => {
  return (
    <Grid size={{ xs: 12, lg: 4 }}>
      <Card sx={{ height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2.5,
            py: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Fila de Espera
          </Typography>
          <Chip
            component={Link}
            to="/fila"
            label="Ver Detalhes"
            size="small"
            icon={<ArrowForwardIcon />}
            clickable
            color="primary"
            variant="outlined"
          />
        </Box>
        <Divider />
        <List disablePadding>
          {aguardando.slice(0, 5).map((c, i) => (
            <ListItemButton
              key={c.id}
              component={Link}
              to={`/chamados/${c.id}`}
              divider={i < aguardando.length - 1}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: 36,
                    height: 36,
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {c.senha}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={c.paciente.nome}
                secondary={c.queixaPrincipal}
              />
              <PrioridadeBadge prioridade={c.prioridade} />
            </ListItemButton>
          ))}
        </List>
      </Card>
    </Grid>
  );
};
