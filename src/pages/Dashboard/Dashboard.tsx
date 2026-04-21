import { Box, Grid } from "@mui/material";
import { HeaderDashboard } from "./components/HeaderDashboard";
import { FilaDeEspera } from "./components/FilaDeEspera";
import { EmAtendimento } from "./components/EmAtendimento";
import { Alertas } from "./components/Alertas";
import { Stats } from "./components/Stats";

export const Dashboard = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <HeaderDashboard />
      <Stats />

      <Grid container spacing={3}>
        <FilaDeEspera />
        <EmAtendimento />
        <Alertas />
      </Grid>
    </Box>
  );
};
