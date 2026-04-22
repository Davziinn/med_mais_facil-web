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

interface PacienteInfoProps {
  id: number;
}

const pacientesMock = {
  1: {
    nome: "Davi Menezes",
    cpf: "085.983.623-10",
    idade: 21,
    genero: "Masculino",
    convenio: "CAMED · 0012345678",
  },
  2: {
    nome: "João Silva",
    cpf: "111.222.333-44",
    idade: 30,
    genero: "Masculino",
    convenio: "Unimed",
  },
};

const getPaciente = (id: number) =>
  pacientesMock[id as keyof typeof pacientesMock] || {
    nome: `Paciente ${id}`,
    cpf: "000.000.000-00",
    idade: 20,
    genero: "Não informado",
    convenio: "Plano não informado",
  };

export const PacienteInfo = ({ id }: PacienteInfoProps) => {
  const paciente = getPaciente(id);

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
            <Field label="Nome" value={paciente.nome} />
            <Field label="CPF" value={paciente.cpf} />
            <Field label="Idade" value={`${paciente.idade} anos`} />
            <Field label="Gênero" value={paciente.genero} />
            <Field label="Convênio" value={paciente.convenio} />
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Typography variant="caption" color="text.secondary">
            Condições Preexistentes
          </Typography>

          <Stack
            direction="row"
            spacing={0.5}
            sx={{ flexWrap: "wrap" }}
            useFlexGap
          >
            <Chip
              label="Diabetes"
              size="small"
              color="warning"
              variant="outlined"
            />
            <Chip
              label="Hipertensão"
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
