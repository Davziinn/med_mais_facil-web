import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Avatar,
  Divider,
  Chip,
  IconButton,
  Slide,
  alpha,
} from "@mui/material";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import CloseIcon from "@mui/icons-material/Close";

import { forwardRef } from "react";
import type { SlideProps } from "@mui/material";
import type { Role } from "../../../contexts/AuthContext";

interface Props {
  open: boolean;
  onClose: () => void;
  nome: string;
  email: string;
  role: Role;
}

const roleLabel: Record<Role, string> = {
  ADMINISTRADOR: "Administrador",
  MEDICO: "Médico",
  RECEPCAO: "Recepção",
};

const roleColor: Record<Role, "primary" | "success" | "info"> = {
  ADMINISTRADOR: "primary",
  MEDICO: "success",
  RECEPCAO: "info",
};

const Transition = forwardRef<unknown, SlideProps>(function Transition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ModalPerfil = ({ open, onClose, nome, email, role }: Props) => {
  const iniciais = nome
    .split(" ")
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join("");

  const nomeExibido = role === "MEDICO" ? `Dr. ${nome}` : nome;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slots={{ transition: Transition }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            p: 0,
            maxWidth: 420,
            width: "100%",
            boxShadow: 24,
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 3,
          py: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={(t) => ({
            width: 40,
            height: 40,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: alpha(t.palette.primary.main, 0.12),
            color: "primary.main",
          })}
        >
          <AccountCircleOutlinedIcon />
        </Box>

        <Typography variant="h6" sx={{ flex: 1, fontWeight: 700 }}>
          Meu Perfil
        </Typography>

        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 3 }}>
        {/* Avatar e nome */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
            mb: 3,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 72,
              height: 72,
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {iniciais}
          </Avatar>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {nomeExibido}
            </Typography>

            <Chip
              label={roleLabel[role]}
              color={roleColor[role]}
              size="small"
              sx={{ mt: 0.5, fontWeight: 600, fontSize: 12 }}
            />
          </Box>
        </Box>

        <Divider sx={{ mb: 2.5 }} />

        {/* Informações */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={(t) => ({
                width: 36,
                height: 36,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: alpha(t.palette.primary.main, 0.08),
                color: "primary.main",
                flexShrink: 0,
              })}
            >
              <BadgeOutlinedIcon fontSize="small" />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Nome completo
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {nome}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={(t) => ({
                width: 36,
                height: 36,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: alpha(t.palette.primary.main, 0.08),
                color: "primary.main",
                flexShrink: 0,
              })}
            >
              <EmailOutlinedIcon fontSize="small" />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                E-mail
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {email}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={(t) => ({
                width: 36,
                height: 36,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: alpha(t.palette[roleColor[role]].main, 0.08),
                color: `${roleColor[role]}.main`,
                flexShrink: 0,
              })}
            >
              <AccountCircleOutlinedIcon fontSize="small" />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Perfil de acesso
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {roleLabel[role]}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Button onClick={onClose} variant="contained" color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};