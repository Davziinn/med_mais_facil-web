import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HistoryIcon from "@mui/icons-material/History";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SearchIcon from "@mui/icons-material/Search";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import HealingIcon from "@mui/icons-material/Healing";
import BiotechIcon from '@mui/icons-material/Biotech';
import EventNoteIcon from "@mui/icons-material/EventNote";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SettingsIcon from "@mui/icons-material/Settings";

import { NavLink, useLocation } from "react-router-dom";
import { useAuth, type Role } from "../../../contexts/AuthContext";

type NavItem = {
  to: string;
  icon: React.ReactNode;
  label: string;
  exact?: boolean;
};

const navByRole: Record<Role, NavItem[]> = {
  MEDICO: [
    { to: "/",          icon: <DashboardIcon />, label: "Dashboard",          exact: true },
    { to: "/fila",      icon: <ListAltIcon />,   label: "Fila de Atendimento" },
    { to: "/pacientes", icon: <PeopleIcon />,    label: "Pacientes"           },
    { to: "/historico", icon: <HistoryIcon />,   label: "Histórico"           },
  ],

  RECEPCAO: [
    { to: "/recepcao",                icon: <DashboardIcon />,    label: "Dashboard",        exact: true },
    { to: "/recepcao/checkin",        icon: <QrCodeScannerIcon />,label: "Check-in"                      },
    { to: "/recepcao/fila",           icon: <ListAltIcon />,      label: "Fila operacional"              },
    { to: "/recepcao/busca",          icon: <SearchIcon />,       label: "Busca de paciente"             },
    { to: "/recepcao/encaminhamento", icon: <CallSplitIcon />,    label: "Encaminhamento"                },
  ],

  ADMINISTRADOR: [
    { to: "/adm",                icon: <AdminPanelSettingsIcon />, label: "Painel ADM",       exact: true},
    { to: "/adm/usuarios",       icon: <PeopleIcon />,            label: "Usuários"                       },
    { to: "/adm/hospitais",      icon: <LocalHospitalIcon />,     label: "Hospitais"                      },
    { to: "/adm/especialidades", icon: <MedicalServicesIcon />,   label: "Especialidades"                 },
    { to: "/adm/sintomas",       icon: <HealingIcon />,           label: "Sintomas"                       },
    { to: "/adm/exames",         icon: <BiotechIcon />,           label: "Exames"                         },
    { to: "/adm/eventos",        icon: <EventNoteIcon />,         label: "Eventos Clínicos"               },
    { to: "/adm/logs",           icon: <ReceiptLongIcon />,       label: "Logs / Auditoria"               },
    { to: "/adm/configuracoes",  icon: <SettingsIcon />,          label: "Configurações"                  },
  ],
};

export const NavList = () => {
  const location = useLocation();
  const { user } = useAuth();
  const navItems = user ? navByRole[user.role] ?? [] : [];

  return (
    <List sx={{ px: 1.5, py: 2 }}>
      {navItems.map((item) => {
        const isActive = item.exact
          ? location.pathname === item.to
          : location.pathname.startsWith(item.to);

        return (
          <ListItem key={item.to} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={NavLink}
              to={item.to}
              sx={{
                borderRadius: 2,
                px: 2,
                py: 1.2,
                position: "relative",
                bgcolor: isActive ? "primary.main" : "transparent",
                color: isActive ? "#fff" : "rgba(238,242,247,0.7)",
                transform: isActive ? "scale(1.02)" : "scale(1)",
                boxShadow: isActive ? 3 : "none",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: isActive ? "primary.main" : "rgba(255,255,255,0.06)",
                  color: "#fff",
                },
                "&::before": isActive
                  ? {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: "20%",
                      height: "60%",
                      width: 4,
                      borderRadius: 2,
                      bgcolor: "#fff",
                    }
                  : {},
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: "0.875rem",
                      fontWeight: isActive ? 600 : 400,
                    },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};