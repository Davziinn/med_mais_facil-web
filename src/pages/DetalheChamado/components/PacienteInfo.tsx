import {
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Field } from "../../../components/Field";

export const PacienteInfo = () => {
  return (
    <Grid size={{ xs: 12, lg: 4 }}>
      <Card>
        <CardContent>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", mb: 2 }}
          >
            <PersonIcon />
            <Typography variant="subtitle2">Dados do Paciente</Typography>
          </Stack>
          <Stack spacing={1.5}>
            <Field label="Nome" value="Davi Menezes" />
            <Field label="CPF" value="085.983.623-10" />
            <Field label="Idade" value={`21 anos.`} />
            <Field label="Gênero" value="Masculino" />
            <Field label="Convênio" value={`CAMED · 0012345678`} />
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 1, display: "block" }}
          >
            Condições Preexistentes
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ flexWrap: "wrap" }}
            useFlexGap
          >
            <Chip
              key={1}
              label="Diabetes"
              size="small"
              color="warning"
              variant="outlined"
            />
            <Chip
              key={2}
              label="Hipertensão"
              size="small"
              color="warning"
              variant="outlined"
            />
            <Chip
              key={3}
              label="Asma"
              size="small"
              color="warning"
              variant="outlined"
            />
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};
