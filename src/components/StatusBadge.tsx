import { Chip } from "@mui/material";

export type ChamadoStatus =
  | "aguardando"
  | "em_triagem"
  | "em_atendimento"
  | "finalizado"
  | "cancelado";

const config: Record<
  ChamadoStatus,
  {
    label: string;
    color: "default" | "primary" | "success" | "warning" | "error";
  }
> = {
  aguardando: { label: "Aguardando", color: "warning" },
  em_triagem: { label: "Em Triagem", color: "primary" },
  em_atendimento: { label: "Em Atendimento", color: "success" },
  finalizado: { label: "Finalizado", color: "default" },
  cancelado: { label: "Cancelado", color: "error" },
};

type Props = {
  status?: ChamadoStatus;
};

export default function StatusBadge({ status = "aguardando" }: Props) {
  const c = config[status];

  return (
    <Chip
      label={c.label}
      color={c.color}
      size="small"
      variant="outlined"
    />
  );
}