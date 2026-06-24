import { AppBar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SIDEBAR_WIDTH } from "../Sidebar/AppSidebar";
import { Search } from "./components/Search";
import { useAuth } from "../../contexts/AuthContext";

export const TopBar = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const handleSearch = (termo: string) => {
    if (termo.trim()) {
      navigate(`/busca?q=${encodeURIComponent(termo.trim())}`);
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
        width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
        ml: `${SIDEBAR_WIDTH}px`,
      }}
    >
      {usuario?.role === "MEDICO" ? (
        <Search onSearch={handleSearch} />
      ) : (
        <></> // componente futuro
      )}
    </AppBar>
  );
};