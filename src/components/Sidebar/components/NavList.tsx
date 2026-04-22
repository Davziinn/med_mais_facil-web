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
import HistoryIcon from "@mui/icons-material/History";
import { NavLink } from "react-router-dom";

const navItens = [
  { to: "/", icon: <DashboardIcon />, label: "Dashboard" },
  { to: "/fila", icon: <ListAltIcon />, label: "Fila de Atendimento" },
  { to: "/paciente", icon: <PeopleIcon />, label: "Pacientes" },
  { to: "/chamados", icon: <HistoryIcon />, label: "Histórico" },
];

export const NavList = () => {
  return (
    <List sx={{ flex: 1, px: 1.5, py: 2 }}>
      {navItens.map((item) => (
        <ListItem key={item.to} disablePadding sx={{ mb: 0.5 }}>
          <NavLink
            to={item.to}
            end
            style={{ textDecoration: "none", width: "100%" }}
          >
            {({ isActive }) => (
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  px: 2,
                  py: 1.2,
                  position: "relative",
                  width: "100%",

                  bgcolor: isActive ? "primary.main" : "transparent",
                  color: isActive ? "#fff" : "rgba(238,242,247,0.7)",

                  // 🔥 destaque visual
                  transform: isActive ? "scale(1.03)" : "scale(1)",
                  boxShadow: isActive ? 3 : "none",

                  // 🔥 barra lateral
                  "&::before": isActive
                    ? {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: "20%",
                        height: "60%",
                        width: 4,
                        borderRadius: 2,
                      }
                    : {},

                  "&:hover": {
                    bgcolor: isActive
                      ? "primary.main"
                      : "rgba(255,255,255,0.06)",
                  },

                  transition: "all 0.2s ease",
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>

                <ListItemText primary={item.label} />
              </ListItemButton>
            )}
          </NavLink>
        </ListItem>
      ))}
    </List>
  );
};
