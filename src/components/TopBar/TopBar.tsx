import { AppBar } from "@mui/material";
import { SIDEBAR_WIDTH } from "../Sidebar/AppSidebar";
import { Search } from "./components/Search";

export const TopBar = () => {
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
      <Search />
    </AppBar>
  );
};
