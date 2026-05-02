import { api } from "./api";

export interface IniciarAtendimentoRequestDTO {
    chamadoId: number;
    medicoId: number;
}

export interface IniciarAtendimentoResponseDTO {
    id: number;
}


export const postIniciarAtendimento = async (request: IniciarAtendimentoRequestDTO): Promise<IniciarAtendimentoResponseDTO> => {
    const response = await api.post<IniciarAtendimentoResponseDTO>('/atendimento/iniciar', request) 
    return response.data
}