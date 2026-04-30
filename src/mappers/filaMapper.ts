import type { ChipPrioridadeCor } from "../components/PrioridadeBadge";
import type { FilaAtendimentoResponseDTO, PrioridadeChamadoResponseAPI, StatusChamadoResponseAPI } from "../service/api/filaAtendimentoService";

export type FilaAtendimentoUI = Omit<FilaAtendimentoResponseDTO, "prioridadeChamado"> & {
    prioridadeChamado: ChipPrioridadeCor;
}
export const mapPrioridadeChamado = (prioridade: PrioridadeChamadoResponseAPI): ChipPrioridadeCor => {
    const map: Record<PrioridadeChamadoResponseAPI, ChipPrioridadeCor> ={
        BAIXA: "verde",
        MEDIA: "amarelo",
        ALTA: "laranja",
        CRITICA: "vermelho"
    }

    return map[prioridade]
}

export const mapStatusChamado = (status: StatusChamadoResponseAPI): string => {
    const map: Record<StatusChamadoResponseAPI, string> = {
        EM_ESPERA: "Em Espera",
        EM_ATENDIMENTO: "Em Atendimento",
        FINALIZADO: "Finalizado",
        CANCELADO: "Cancelado"
    }
    return map[status]
}