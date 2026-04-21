import { Grid } from "@mui/material"
import { StatCard } from "../../../components/StatCard"
import CancelIcon from "@mui/icons-material/Cancel";
import HistoryIcon from "@mui/icons-material/History";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const Stats = () => {
    return (
        <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Total no Período"
          value={6}
          icon={<HistoryIcon />}
          color="#0284c7"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Finalizados"
          value={4}
          icon={<CheckCircleIcon />}
          color="#16a34a"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Cancelados"
          value={2}
          icon={<CancelIcon />}
          color="#e11d48"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Duração Média"
          value={"38 min"}
          icon={<TrendingUpIcon />}
          color="#0284c7"
        />
      </Grid>
    </Grid>
    )
}