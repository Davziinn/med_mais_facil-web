/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect } from "react";
import { StatCard } from "../../../../components/StatCard";
import { useDashboardMetricas } from "../../../../hooks/useDashboardMetricas";

export const Stats = () => {
  const { metricas, carregarMetricas } = useDashboardMetricas();
  
  useEffect(() => {
    carregarMetricas();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Chamados Hoje"
          value={metricas?.chamadosHoje}
          icon={<AssignmentIcon />}
          color="#0284c7"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Aguardando"
          value={metricas?.aguardando}
          icon={<AccessTimeIcon />}
          color="#e11d48"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Em Atendimento"
          value={metricas?.emAtendimento}
          icon={<PersonIcon />}
          color="#16a34a"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Finalizados"
          value={metricas?.finalizados}
          icon={<CheckCircleIcon />}
          color="#0284c7"
        />
      </Grid>
    </Grid>
  );
};
