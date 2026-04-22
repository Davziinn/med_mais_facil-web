import {
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DescriptionIcon from "@mui/icons-material/Description";

interface AlertasEventosProps {
  id: number;
}

const alertasMock = {
  1: {
    sinais: ["Dor de Cabeça", "Dor de Dente"],
    eventos: ["Queda há 3 dias", "Internação recente"],
  },
  2: {
    sinais: ["Febre alta", "Tosse persistente"],
    eventos: ["Consulta há 1 dia"],
  },
};

const getAlertas = (id: number) =>
  alertasMock[id as keyof typeof alertasMock] || {
    sinais: [],
    eventos: [],
  };

export const AlertasEventos = ({ id }: AlertasEventosProps) => {
  const { sinais, eventos } = getAlertas(id);

  return (
    <Grid size={{ xs: 12, lg: 4 }}>
      <Stack spacing={3}>
        <Card
          sx={{
            border: "1px solid",
            borderColor: "error.light",
            bgcolor: "#fef3f3",
          }}
        >
          <CardContent>
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", mb: 2 }}
            >
              <WarningAmberIcon color="error" fontSize="small" />
              <Typography variant="subtitle2">Sinais de Alerta</Typography>
            </Stack>

            <Stack spacing={1}>
              {sinais.map((s, index) => (
                <Chip
                  key={index}
                  label={s}
                  color="error"
                  icon={<WarningAmberIcon />}
                  sx={{ justifyContent: "flex-start" }}
                />
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", mb: 2 }}
            >
              <DescriptionIcon color="primary" fontSize="small" />
              <Typography variant="subtitle2">Eventos Recentes</Typography>
            </Stack>

            <Stack spacing={1}>
              {eventos.map((e, index) => (
                <Chip
                  key={index}
                  label={e}
                  variant="outlined"
                  sx={{ justifyContent: "flex-start" }}
                />
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", mb: 2 }}
            >
              <DescriptionIcon color="success" fontSize="small" />
              <Typography variant="subtitle2">Guia De Autorização</Typography>
            </Stack>

            <Button variant="outlined" color="primary" fullWidth>
              Gerar Pré-solicitação de Guia
            </Button>
          </CardContent>
        </Card>
      </Stack>
    </Grid>
  );
};
