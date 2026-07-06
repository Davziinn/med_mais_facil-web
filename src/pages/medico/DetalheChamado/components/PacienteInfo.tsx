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
import type { DetalheChamadoUI } from "../../../../mappers/detalheMapper";
import { Field } from "../../../../components/Field";

interface PacienteInfoProps {
  chamado: DetalheChamadoUI | null;
}

export const PacienteInfo = ({ chamado }: PacienteInfoProps) => {
  return (
    <Grid size={{ xs: 12, lg: 4 }}>
      <Card>
        <CardContent>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
            <PersonIcon />
            <Typography variant="subtitle2">Dados do Paciente</Typography>
          </Stack>

          <Stack spacing={1.5}>
            <Field label="Nome" value={chamado?.paciente.nome ?? "---"} />
            <Field label="CPF" value={chamado?.paciente.cpf ?? "---"} />
            <Field
              label="Idade"
              value={`${chamado?.paciente.idade ?? "---"} ano(s)`}
            />
            <Field label="Gênero" value={chamado?.paciente.sexo ?? "---"} />
            <Field
              label="Convênio"
              value={chamado?.paciente.convenio ?? "Não informado"}
            />
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Typography variant="caption" color="text.secondary">
            Condições Preexistentes
          </Typography>

          <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap" }} useFlexGap>
            {chamado?.paciente.condicoesPreexistentes.map((condicao, index) => (
              <Chip
                key={index}
                label={condicao || "Sem condições preexistentes"}
                size="small"
                color="warning"
                variant="outlined"
              />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};