  import { Chip } from "@mui/material";

  export type ChamadoStatus =
    | "EM_ESPERA"
    | "EM_ATENDIMENTO"
    | "FINALIZADO"
    | "CANCELADO";

  const config: Record<
    ChamadoStatus,
    {
      label: string;
      color: "default" | "primary" | "success" | "warning" | "error";
    }
  > = {
    EM_ESPERA: { label: "Aguardando", color: "primary" },
    EM_ATENDIMENTO: { label: "Em Atendimento", color: "success" },
    FINALIZADO: { label: "Finalizado", color: "default" },
    CANCELADO: { label: "Cancelado", color: "error" },
  };

  type Props = {
    status?: ChamadoStatus;
  };

  export default function StatusBadge({ status = "EM_ESPERA" }: Props) {
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