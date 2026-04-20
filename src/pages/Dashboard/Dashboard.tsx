import { Box, Grid } from "@mui/material";
import { HeaderDashboard } from "./components/HeaderDashboard";
import { Stats } from "./components/Stats";
import { FilaDeEspera } from "./components/FilaDeEspera";
import { EmAtendimento } from "./components/EmAtendimento";
import { Alertas } from "./components/Alertas";

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
