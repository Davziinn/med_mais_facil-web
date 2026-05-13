import type {
  FilaEsperaResponseDTO,
  PrioridadeChamadoResponseAPI,
  StatusChamadoResponseAPI,
} from "../service/api/filaEsperaService";

export type FilaEsperaUI = FilaEsperaResponseDTO;

export const mapPrioridadeChamado = (
  prioridade: PrioridadeChamadoResponseAPI
): PrioridadeChamadoResponseAPI => prioridade;

export const mapStatusChamado = (status: StatusChamadoResponseAPI): string => {
  const map: Record<StatusChamadoResponseAPI, string> = {
    EM_ESPERA: "Em Espera",
    EM_ATENDIMENTO: "Em Atendimento",
    FINALIZADO: "Finalizado",
    CANCELADO: "Cancelado",
    AGUARDANDO_CHECKIN: "Aguardando Check-in",
    AUSENTE: "Ausente",
  };
  return map[status];
};