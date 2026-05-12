/* eslint-disable react-refresh/only-export-components */
import { Box, Chip, Typography } from "@mui/material";
import type { PrioridadeChamadoResponseAPI } from "../../service/api/filaEsperaService";

// --- NOVAS CONSTANTES PARA LIGHT MODE ---
export const DARK_BG = "#f8fafc";
export const PANEL_BG = "#ffffff";
export const PANEL_BORDER = "#e2e8f0";
export const PANEL_HOVER = "#f1f5f9";
export const TEXT = "#0f172a";
export const TEXT_DIM = "#64748b";

export const PRIORIDADE_CONFIG: Record<
  PrioridadeChamadoResponseAPI,
  {
    bg: string;
    fg: string;
    label: string;
    dot: string;
  }
> = {
  CRITICA: {
    bg: "#fff1f2",
    fg: "#e11d48",
    label: "Emergência",
    dot: "#e11d48",
  },

  ALTA: {
    bg: "#fff7ed",
    fg: "#ea580c",
    label: "Urgente",
    dot: "#ea580c",
  },

  MEDIA: {
    bg: "#fefce8",
    fg: "#854d0e",
    label: "Moderado",
    dot: "#ca8a04",
  },

  BAIXA: {
    bg: "#f0fdf4",
    fg: "#166534",
    label: "Baixa",
    dot: "#16a34a",
  },
};

export const PRIORIDADE_COR = PRIORIDADE_CONFIG;

export function PrioridadeTag({ p }: { p: PrioridadeChamadoResponseAPI }) {
  const c = PRIORIDADE_CONFIG[p];

  if (!c) return null;

  return (
    <Chip
      size="small"
      label={
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Box
            sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: c.dot }}
          />
          {c.label}
        </Box>
      }
      sx={{
        bgcolor: c.bg,
        color: c.fg,
        fontWeight: 700,
        border: `1px solid ${c.fg}33`,
        "& .MuiChip-label": { px: 1 },
      }}
    />
  );
}

export const PRESENCA_LABEL: Record<string, { label: string; color: string }> =
  {
    aguardando_checkin: { label: "Aguardando check-in", color: "#64748b" },
    presente: { label: "Na fila", color: "#2563eb" },
    ausente: { label: "Ausente", color: "#dc2626" },
    encaminhado: { label: "Encaminhado", color: "#059669" },
  };

export function PresencaTag({ s }: { s: string }) {
  const c = PRESENCA_LABEL[s] || PRESENCA_LABEL.aguardando_checkin;
  return (
    <Chip
      size="small"
      label={c.label}
      variant="outlined"
      sx={{
        color: c.color,
        borderColor: `${c.color}66`,
        fontWeight: 600,
        bgcolor: `${c.color}08`,
      }}
    />
  );
}

export function PageShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        m: -3,
        p: { xs: 2.5, md: 4 },
        minHeight: "calc(100vh - 64px)",
        bgcolor: DARK_BG,
        color: TEXT,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { md: "center" },
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, color: TEXT, letterSpacing: "-0.02em" }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="body2"
              sx={{ color: TEXT_DIM, mt: 0.5, fontWeight: 500 }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        {actions}
      </Box>
      {children}
    </Box>
  );
}

export const panelSx = {
  bgcolor: PANEL_BG,
  border: `1px solid ${PANEL_BORDER}`,
  borderRadius: 3, // Bordas um pouco mais arredondadas para um look moderno
  color: TEXT,
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)", // Sombra leve para destacar no fundo cinza
};
