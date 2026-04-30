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
import { useFilaAtendimento } from "../../../hooks/useFilaAtendimento";

export const FilaDeEspera = () => {
  const { filaAtendimento } = useFilaAtendimento()
  
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
          {filaAtendimento.slice(0, 5).map((fila, i) => (
            <ListItemButton
              key={fila.id}
              // component={Link}
              // to={`/chamados/${c.id}`}
              divider={i < filaAtendimento.length - 1}
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
                  {fila.senha}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={fila.paciente.nome}
                secondary={fila.queixa}
              />
              <PrioridadeBadge prioridade={fila.prioridadeChamado} />
            </ListItemButton>
          ))}
        </List>
      </Card>
    </Grid>
  );
};
