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
import { useDetalheChamado } from "../../../../hooks/useDetalheChamado";
import { Field } from "../../../../components/Field";

interface PacienteInfoProps {
  id: number;
}

export const PacienteInfo = ({ id }: PacienteInfoProps) => {
  const { detalheChamado } = useDetalheChamado(id);

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
            <Field
              label="Nome"
              value={detalheChamado?.paciente.nome ?? "---"}
            />
            <Field label="CPF" value={detalheChamado?.paciente.cpf ?? "---"} />
            <Field
              label="Idade"
              value={`${detalheChamado?.paciente.idade ?? "---"} ano(s)`}
            />
            <Field
              label="Gênero"
              value={detalheChamado?.paciente.sexo ?? "---"}
            />
            <Field
              label="Convênio"
              value={/*detalheChamado?.paciente.convenio ?? '---'*/ "---"}
            />
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
            {detalheChamado?.paciente.condicoesPreexistentes.map(
              (condicao, index) => {
                return (
                  <Chip
                    key={index}
                    label={condicao || "Sem condições preexistentes"}
                    size="small"
                    color="warning"
                    variant="outlined"
                  />
                );
              },
            )}
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};
