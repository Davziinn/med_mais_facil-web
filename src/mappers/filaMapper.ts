import type { ChipPrioridadeCor } from "../components/PrioridadeBadge";
import type { FilaAtendimentoResponseDTO, PrioridadeResponseAPI, StatusChamado } from "../service/api/filaAtendimento";

export type FilaAtendimentoUI = Omit<FilaAtendimentoResponseDTO, "prioridadeChamado"> & {
    prioridadeChamado: ChipPrioridadeCor;
}

export const mapPrioridadeChamado = (prioridade: PrioridadeResponseAPI): ChipPrioridadeCor => {
    const map: Record<PrioridadeResponseAPI, ChipPrioridadeCor> ={
        BAIXA: "verde",
        MEDIA: "amarelo",
        ALTA: "laranja",
        CRITICA: "vermelho"
    }

    return map[prioridade]
}

export const mapStatusChamado = (status: StatusChamado): string => {
    const map: Record<StatusChamado, string> = {
        EM_ESPERA: "Em Espera",
        EM_ATENDIMENTO: "Em Atendimento",
        FINALIZADO: "Finalizado",
        CANCELADO: "Cancelado"
    }
    return map[status]
}