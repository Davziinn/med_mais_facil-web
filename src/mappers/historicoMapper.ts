// historicoMapper.ts
import type { ChipPrioridadeCor } from "../components/PrioridadeBadge";
import type { HistoricoAtendimentoResponseDTO } from "../service/api/historicoAtendimento";

export type HistoricoAtendimentoUI = Omit<
  HistoricoAtendimentoResponseDTO,
  "prioridade"
> & {
  prioridade: ChipPrioridadeCor;
};

type PrioridadeHistoricoAPI = "CRITICA" | "ALTA" | "MEDIA" | "BAIXA";

export const mapPrioridadeHistorico = (
  prioridade: string,
): ChipPrioridadeCor => {
  const map: Record<PrioridadeHistoricoAPI, ChipPrioridadeCor> = {
    CRITICA: "vermelho",
    ALTA: "laranja",
    MEDIA: "amarelo",
    BAIXA: "verde",
  };
  return map[prioridade as PrioridadeHistoricoAPI] ?? "verde";
};
