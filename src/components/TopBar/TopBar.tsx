import { AppBar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SIDEBAR_WIDTH } from "../Sidebar/AppSidebar";
import { Search } from "./components/Search";

export const TopBar = () => {
  const navigate = useNavigate();

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
      <Search onSearch={handleSearch} />
    </AppBar>
  );
};