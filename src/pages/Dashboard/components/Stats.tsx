/* eslint-disable react-refresh/only-export-components */
import { Grid } from "@mui/material";
import { StatCard } from "../../../components/StatCard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const estatisticas = {
  chamadosHoje: 6,
  aguardando: 3,
  emAtendimento: 2,
  finalizados: 12,
  tempoMedioEspera: "35 min",
};

export const Stats = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Chamados Hoje"
          value={estatisticas.chamadosHoje}
          icon={<AssignmentIcon />}
          color="#0284c7"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Aguardando"
          value={estatisticas.aguardando}
          icon={<AccessTimeIcon />}
          color="#e11d48"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Em Atendimento"
          value={estatisticas.emAtendimento}
          icon={<PersonIcon />}
          color="#16a34a"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Finalizados"
          value={estatisticas.finalizados}
          icon={<CheckCircleIcon />}
          color="#0284c7"
        />
      </Grid>
    </Grid>
  );
};
