import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrioridadeBadge from "../../../components/PrioridadeBadge";
import StatusBadge from "../../../components/StatusBadge";

export const HeaderDetalhe = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <IconButton component={Link} to="/fila">
        <ArrowBackIcon />
      </IconButton>

      <Box sx={{ flex: 1 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>Chamado A001</Typography>
            <PrioridadeBadge prioridade="verde" />
            <StatusBadge status="em_triagem" />
        </Stack>
        <Typography>Aberto em {new Date().toLocaleString("pt-BR")} · Hospital Kra Lho</Typography>
      </Box>
      <Stack direction="row" spacing={1}>
        <Button variant="contained">Iniciar Atendimento</Button>
        <Button variant="outlined">Prescrever</Button>
      </Stack>
    </Box>
  );
};
