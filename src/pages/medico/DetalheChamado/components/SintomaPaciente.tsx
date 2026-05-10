import {
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useDetalheChamado } from "../../../../hooks/useDetalheChamado";

interface SintomaPacienteProps {
  id: number;
}

const intensityColor = (v: number): "error" | "warning" | "success" =>
  v >= 8 ? "error" : v >= 5 ? "warning" : "success";


export const SintomaPaciente = ({ id }: SintomaPacienteProps) => {

  const { detalheChamado } = useDetalheChamado(id)

  return (
    <Grid size={{ xs: 12, lg: 4 }}>
      <Card>
        <CardContent>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", mb: 2 }}
          >
            <FavoriteIcon color="error" fontSize="small" />
            <Typography variant="subtitle2">Sintomas Reportados</Typography>
          </Stack>

          <Typography variant="body2" sx={{ fontWeight: 500, mb: 2 }}>
            Queixa: {detalheChamado?.queixa || "Não informado"}
          </Typography>

          <Stack spacing={2}>
            {detalheChamado?.sintomas.map((sintoma, index) => (
              <Card key={index} variant="outlined" sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {sintoma.descricao}
                  </Typography>

                  <Typography variant="caption" sx={{ fontWeight: 700 }}>
                    {sintoma.intensidade}/10
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={sintoma.intensidade * 10}
                  color={intensityColor(sintoma.intensidade)}
                  sx={{ height: 6, borderRadius: 3, mb: 1 }}
                />

                <Stack direction="row" spacing={2}>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ alignItems: "center" }}
                  >
                    <AccessTimeIcon
                      sx={{ fontSize: 12, color: "text.secondary" }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {sintoma.tempoSintoma || "Tempo não informado"}
                    </Typography>
                  </Stack>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {sintoma.frequencia || "Frequência não informada"}
                  </Typography>
                </Stack>
              </Card>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};
