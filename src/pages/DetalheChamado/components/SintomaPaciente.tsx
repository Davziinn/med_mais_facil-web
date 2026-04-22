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

const intensityColor = (v: number): "error" | "warning" | "success" =>
  v >= 8 ? "error" : v >= 5 ? "warning" : "success";

export const SintomaPaciente = () => {
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
            Queixa: Dor de cabeça
          </Typography>
          <Stack spacing={2}>
            <Card key={1} variant="outlined" sx={{ p: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Dor de Cabeça
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                  8/10
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={8 * 10}
                color={intensityColor(8)}
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
                    2 horas
                  </Typography>
                </Stack>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ textTransform: "capitalize" }}
                >
                  Continuo
                </Typography>
              </Stack>
            </Card>
            <Card key={1} variant="outlined" sx={{ p: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Dor de Dente
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                  5/10
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={5 * 10}
                color={intensityColor(5)}
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
                    1 horas
                  </Typography>
                </Stack>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ textTransform: "capitalize" }}
                >
                  Intermitente
                </Typography>
              </Stack>
            </Card>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};
