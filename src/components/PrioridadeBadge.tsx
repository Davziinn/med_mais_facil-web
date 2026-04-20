import { Chip } from "@mui/material";

export type Prioridade = "vermelho" | "laranja" | "amarelo" | "verde";

const config: Record<Prioridade, { label: string; color: "error" | "warning" | "info" | "success" }> = {
  vermelho: { label: "Emergência", color: "error" },
  laranja: { label: "Urgente", color: "warning" },
  amarelo: { label: "Moderado", color: "info" },
  verde: { label: "Baixa", color: "success" },
};

export default function PrioridadeBadge({ prioridade }: { prioridade: Prioridade }) {
  const c = config[prioridade];
  return <Chip label={c.label} color={c.color} size="small" />;
}