import {
  Box,
  Avatar,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";


export const Footer = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <Avatar
        sx={{
          bgcolor: "primary.main",
          width: 36,
          height: 36,
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        {user?.iniciais ?? "?"}
      </Avatar>

      <Box
        sx={{
          minWidth: 0,
          flex: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: "#eef2f7",
          }}
          noWrap
        >
          {user?.nome ?? "Visitante"}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            color: "rgba(238,242,247,0.5)",
          }}
        >
          {user?.cargo ?? "—"}
        </Typography>
      </Box>

      {user && (
        <Tooltip title="Sair">
          <IconButton
            size="small"
            onClick={handleLogout}
            sx={{
              color: "rgba(238,242,247,0.7)",
            }}
          >
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};