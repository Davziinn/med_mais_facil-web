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
import { useDetalheChamado } from "../../../hooks/useDetalheChamado";

interface AlertasEventosProps {
  id: number;
}

export const AlertasEventos = ({ id }: AlertasEventosProps) => {
  const { detalheChamado } = useDetalheChamado(id);

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
              {detalheChamado?.sinaisAlertas.map((sinaisAlertas, index) => (
                <Chip
                  key={index}
                  label={sinaisAlertas.descricao}
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
              {detalheChamado?.eventosClinicos.map((eventosClinicos) => (
                <Chip
                  key={eventosClinicos.id}
                  label={eventosClinicos.descricao}
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
