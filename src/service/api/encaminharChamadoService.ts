import { api } from "./api";
import type { EspecialidadeMedicoResponseDTO } from "./especialidadeService";
import type { StatusChamadoResponseAPI } from "./filaEsperaService";

export interface EncaminharChamadoRequestDTO {
    especialidadeId: number
}

export interface EncaminharChamadoResponseDTO {
    id: number;
    statusChamado: StatusChamadoResponseAPI;
    especialidadeMedico: EspecialidadeMedicoResponseDTO
}

export const putEncaminharChamadoParaEspecialidade = async (chamadoId: number, request: EncaminharChamadoRequestDTO): Promise<EncaminharChamadoResponseDTO> => {
    const response = await api.put(`/especialidade/chamado/${chamadoId}/encaminhar`, request)
    return response.data

}