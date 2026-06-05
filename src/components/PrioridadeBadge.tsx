import { Chip } from "@mui/material";
import type { PrioridadeChamadoResponseAPI } from "../service/api/filaEsperaService";

export type ChipPrioridadeCor =
  | "vermelho"
  | "laranja"
  | "amarelo"
  | "verde";

type PrioridadeBadgeValue =
  | ChipPrioridadeCor
  | PrioridadeChamadoResponseAPI;

const config = {
  vermelho: {
    label: "Emergência",
    color: "error",
  },
  laranja: {
    label: "Urgente",
    color: "warning",
  },
  amarelo: {
    label: "Moderado",
    color: "info",
  },
  verde: {
    label: "Baixa",
    color: "success",
  },
} as const;

const apiToColor: Record<
  PrioridadeChamadoResponseAPI,
  ChipPrioridadeCor
> = {
  CRITICA: "vermelho",
  ALTA: "laranja",
  MEDIA: "amarelo",
  BAIXA: "verde",
};

export default function PrioridadeBadge({
  prioridade,
}: {
  prioridade: PrioridadeBadgeValue | null | undefined;
}) {
  if (!prioridade) return null;

  const cor =
    prioridade in apiToColor
      ? apiToColor[prioridade as PrioridadeChamadoResponseAPI]
      : (prioridade as ChipPrioridadeCor);

  const c = config[cor];

  if (!c) return null;

  return (
    <Chip
      label={c.label}
      color={c.color}
      size="small"
    />
  );
}