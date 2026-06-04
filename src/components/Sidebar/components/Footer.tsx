import {
  Box,
  Avatar,
  Typography,
  Tooltip,
  IconButton,
  ButtonBase,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { ModalPerfil } from "./ModalPerfil";
import { ConfirmActionModal } from "../../modais/ModalConfirmAction";

export const Footer = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [perfilOpen, setPerfilOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleConfirmLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        {/* Área clicável: avatar + nome/role → abre perfil */}
        <Tooltip title="Ver perfil">
          <ButtonBase
            onClick={() => setPerfilOpen(true)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              flex: 1,
              minWidth: 0,
              borderRadius: 2,
              px: 0.5,
              py: 0.25,
              textAlign: "left",
              "&:hover .sidebar-avatar": {
                opacity: 0.85,
              },
              "&:hover .sidebar-name": {
                color: "primary.light",
              },
            }}
          >
            <Avatar
              className="sidebar-avatar"
              sx={{
                bgcolor: "primary.main",
                width: 36,
                height: 36,
                fontSize: 14,
                fontWeight: 700,
                transition: "opacity 0.2s",
                flexShrink: 0,
              }}
            >
              {user?.nome.charAt(0) ?? "?"}
            </Avatar>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                className="sidebar-name"
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: "#eef2f7",
                  transition: "color 0.2s",
                }}
                noWrap
              >
                {user?.role === "MEDICO" ? "Dr." : ""} {user?.nome ?? "Visitante"}
              </Typography>

              <Typography
                variant="caption"
                sx={{ color: "rgba(238,242,247,0.5)" }}
              >
                {user?.role ?? "—"}
              </Typography>
            </Box>
          </ButtonBase>
        </Tooltip>

        {/* Botão logout → abre confirmação */}
        {user && (
          <Tooltip title="Sair">
            <IconButton
              size="small"
              onClick={() => setLogoutOpen(true)}
              sx={{ color: "rgba(238,242,247,0.7)" }}
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Modal de perfil */}
      {user && (
        <ModalPerfil
          open={perfilOpen}
          onClose={() => setPerfilOpen(false)}
          nome={user.nome}
          email={user.email}
          role={user.role}
        />
      )}

      {/* Modal de confirmação de logout */}
      <ConfirmActionModal
        open={logoutOpen}
        title="Sair da conta"
        message="Tem certeza que deseja sair? Você precisará fazer login novamente para acessar o sistema."
        confirmLabel="Sair"
        cancelLabel="Cancelar"
        variant="warning"
        icon="warning"
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};