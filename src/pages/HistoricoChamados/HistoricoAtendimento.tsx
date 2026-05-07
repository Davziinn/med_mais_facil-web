import { Box } from "@mui/material";
import { HeaderHistorico } from "./components/HeaderHistorico";
import { Stats } from "./components/Stats";
import { Busca } from "./components/Busca";
import { ListaHistorico } from "./components/ListaHistorico";

export const HistoricoAtendimento = () => {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <HeaderHistorico />
      <Stats />
      <Busca />
      <ListaHistorico />
    </Box>
  );
};
