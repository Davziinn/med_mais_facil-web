import { Divider, Drawer } from "@mui/material";
import { Logo } from "./components/Logo";
import { NavList } from "./components/NavList";
import { Footer } from "./components/Footer";

const DRAWER_WIDTH = 260;

export const SIDEBAR_WIDTH = DRAWER_WIDTH;

export const AppSidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      <Logo />

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

      <NavList />

      <Footer />
    </Drawer>
  );
};
