import { Chip } from "@mui/material";

export type ChamadoStatus =
  | "AGUARDANDO_CHECKIN"
  | "AGUARDANDO_ENCAMINHAMENTO"
  | "EM_ESPERA"
  | "EM_ATENDIMENTO"
  | "FINALIZADO"
  | "CANCELADO"
  | "AUSENTE";

const config: Record<
  ChamadoStatus,
  {
    label: string;
    bg: string;
    color: string;
    border: string;
  }
> = {
  AGUARDANDO_CHECKIN: {
    label: "Aguardando Check-In",
    bg: "#fff7ed",
    color: "#c2410c",
    border: "#fdba74",
  },

  AGUARDANDO_ENCAMINHAMENTO: {
    label: "Aguardando Encaminhamento",
    bg: "#eff6ff",
    color: "#2563eb",
    border: "#93c5fd",
  },

  EM_ESPERA: {
    label: "Aguardando Atendimento",
    bg: "#eff6ff",
    color: "#2563eb",
    border: "#93c5fd",
  },

  EM_ATENDIMENTO: {
    label: "Em Atendimento",
    bg: "#ecfdf5",
    color: "#16a34a",
    border: "#86efac",
  },

  FINALIZADO: {
    label: "Finalizado",
    bg: "#f3f4f6",
    color: "#4b5563",
    border: "#d1d5db",
  },

  CANCELADO: {
    label: "Cancelado",
    bg: "#fef2f2",
    color: "#dc2626",
    border: "#fca5a5",
  },

  AUSENTE: {
    label: "Ausente",
    bg: "#fefce8",
    color: "#ca8a04",
    border: "#fde68a",
  },
};

type Props = {
  status?: ChamadoStatus;
};

export default function StatusBadge({ status = "EM_ESPERA" }: Props) {
  const c = config[status];

  return (
    <Chip
      label={c.label}
      size="small"
      variant="outlined"
      sx={{
        height: 24,
        maxWidth: "none",
        borderRadius: "999px",
        bgcolor: c.bg,
        color: c.color,
        borderColor: c.border,
        fontWeight: 500,
        fontSize: 12,

        "& .MuiChip-label": {
          px: 1.3,
          overflow: "visible",
          textOverflow: "unset",
          whiteSpace: "nowrap",
        },
      }}
    />
  );
}
