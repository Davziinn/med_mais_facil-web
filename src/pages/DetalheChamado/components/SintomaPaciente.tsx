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

interface SintomaPacienteProps {
  id: number;
}

const intensityColor = (v: number): "error" | "warning" | "success" =>
  v >= 8 ? "error" : v >= 5 ? "warning" : "success";

const sintomasMock = {
  1: [
    {
      nome: "Dor de Cabeça",
      intensidade: 8,
      tempo: "2 horas",
      tipo: "Continuo",
    },
    {
      nome: "Dor de Dente",
      intensidade: 5,
      tempo: "1 hora",
      tipo: "Intermitente",
    },
  ],
  2: [
    { nome: "Febre", intensidade: 7, tempo: "3 horas", tipo: "Continuo" },
    { nome: "Tosse", intensidade: 4, tempo: "2 horas", tipo: "Intermitente" },
  ],
};

const getSintomas = (id: number) =>
  sintomasMock[id as keyof typeof sintomasMock] || [];

export const SintomaPaciente = ({ id }: SintomaPacienteProps) => {
  const sintomas = getSintomas(id);

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
            Queixa: {sintomas[0]?.nome || "Não informado"}
          </Typography>

          <Stack spacing={2}>
            {sintomas.map((s, index) => (
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
                    {s.nome}
                  </Typography>

                  <Typography variant="caption" sx={{ fontWeight: 700 }}>
                    {s.intensidade}/10
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={s.intensidade * 10}
                  color={intensityColor(s.intensidade)}
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
                      {s.tempo}
                    </Typography>
                  </Stack>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {s.tipo}
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
