/* eslint-disable react-hooks/exhaustive-deps */
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
import { Link } from "react-router-dom";
import { useEffect } from "react";
import StatusBadge from "../../../../components/StatusBadge";
import { useFilaEmAtendimento } from "../../../../hooks/useFilaEmAtendimento";

export const EmAtendimento = () => {
  const { filaEmAtendimento, carregarFilaEmAtendimento } = useFilaEmAtendimento()
  
  useEffect(() => {
    carregarFilaEmAtendimento();
  }, [])

  return (
    <Grid size={{ xs: 12, lg: 4 }}>
      <Card sx={{ height: "100%" }}>
        <Box sx={{ px: 2.5, py: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Em Atendimento
          </Typography>
        </Box>
        <Divider />
        {filaEmAtendimento.length === 0 ? (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Nenhum atendimento em andamento
            </Typography>
          </Box>
        ) : (
          <List disablePadding>
            {filaEmAtendimento.map((item, i) => (
              <ListItemButton
                key={item.chamadoId}
                component={Link}
                to={`/chamados/${item.chamadoId}`}
                divider={i < filaEmAtendimento.length - 1}
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
                        {item.nomePaciente}
                      </Typography>
                      <StatusBadge status={item.statusChamado} />
                    </Box>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {item.descricaoRelato} · {item.idadePaciente} anos
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
