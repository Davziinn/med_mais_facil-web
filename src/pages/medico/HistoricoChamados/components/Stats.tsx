/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import HistoryIcon from "@mui/icons-material/History";
import PercentIcon from "@mui/icons-material/Percent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { StatCard } from "../../../../components/StatCard";
import { useHistoricoMetricas } from "../../../../hooks/useHistoricoMetricas";
import { useEffect } from "react";

export const Stats = () => {
  const { historicoMetricas, carregarHistoricoMetricas } =
    useHistoricoMetricas();

  useEffect(() => {
    carregarHistoricoMetricas();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Total no Período (3 meses)"
          value={historicoMetricas?.totalPeriodo}
          icon={<HistoryIcon />}
          color="#0284c7"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Finalizados"
          value={historicoMetricas?.finalizados}
          icon={<CheckCircleIcon />}
          color="#16a34a"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Cancelados"
          value={historicoMetricas?.cancelados}
          icon={<CancelIcon />}
          color="#e11d48"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Taxa Cancelamento"
          value={historicoMetricas?.taxaCancelamento.toFixed(2) + "%"}
          icon={<PercentIcon />}
          color="#f59e0b"
        />
      </Grid>

      {/*
      Futuras métricas históricas possíveis:

      <StatCard
        title="Tempo Médio"
        value={"38 min"}
        icon={<TrendingUpIcon />}
        color="#0284c7"
      />
      */}
    </Grid>
  );
};
