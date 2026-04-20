import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import { NavLink, useLocation } from "react-router-dom";

const navItens = [
  { to: "/", icon: <DashboardIcon />, label: "Dashboard" },
  { to: "/fila", icon: <ListAltIcon />, label: "Fila de Atendimento" },
  { to: "/pacientes", icon: <PeopleIcon />, label: "Pacientes" },
  { to: "/chamados", icon: <DescriptionIcon />, label: "Chamados" },
];

export const NavList = () => {
    const location = useLocation();
    return (
    <List sx={{ flex: 1, px: 1.5, py: 2 }}>
      {navItens.map((item) => {
        const isActive =
          item.to === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(item.to);
        return (
          <ListItem key={item.to} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={NavLink}
              to={item.to}
              sx={{
                borderRadius: 2,
                px: 2,
                py: 1,
                bgcolor: isActive ? "primary.main" : "transparent",
                color: isActive ? "#fff" : "rgba(238,242,247,0.7)",
                "&:hover": {
                  bgcolor: isActive ? "primary.main" : "rgba(255,255,255,0.06)",
                  color: "#fff",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
