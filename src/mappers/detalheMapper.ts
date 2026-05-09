import type { ChipPrioridadeCor } from "../components/PrioridadeBadge";
import type { DetalheChamadoResponseDTO } from "../service/api/detalheChamadoService";
import type { PrioridadeChamadoResponseAPI } from "../service/api/filaEsperaService";

export type DetalheChamadoUI = Omit<DetalheChamadoResponseDTO, "prioridadeChamado"> & {
    prioridadeChamado: ChipPrioridadeCor;
}

export const mapDetalheChamado = (prioridade: PrioridadeChamadoResponseAPI): ChipPrioridadeCor => {
    const map: Record<PrioridadeChamadoResponseAPI, ChipPrioridadeCor> = {
        BAIXA: "verde",
        MEDIA: "amarelo",
        ALTA: "laranja",
        CRITICA: "vermelho"
    }

    return map[prioridade]
}