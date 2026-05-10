import { Chip } from "@mui/material";

export type ChipPrioridadeCor = "vermelho" | "laranja" | "amarelo" | "verde";

const config: Record<
  ChipPrioridadeCor,
  { label: string; color: "error" | "warning" | "info" | "success" }
> = {
  vermelho: { label: "Emergência", color: "error" },
  laranja: { label: "Urgente", color: "warning" },
  amarelo: { label: "Moderado", color: "info" },
  verde: { label: "Baixa", color: "success" },
};

export default function PrioridadeBadge({
  prioridade,
}: {
  prioridade: ChipPrioridadeCor | undefined | null;
}) {
  if (!prioridade || !config[prioridade]) return null;

  const c = config[prioridade];
  return <Chip label={c.label} color={c.color} size="small" />;
}
