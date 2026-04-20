import { Outlet } from "react-router-dom";
import { AppSidebar } from "../components/Sidebar/AppSidebar";
import { Box } from "@mui/material";
import { TopBar } from "../components/TopBar/TopBar";

export const AppLayout = () => {
  return (
    <Box sx={{ display: "flex"}}>
      <AppSidebar />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopBar />

        <Box sx={{ flex: 1, p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
