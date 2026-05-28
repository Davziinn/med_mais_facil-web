import { api } from "./api";

export interface ConfiguracaoRequestDTO {
    tempoLimiteChamado: number;
    quantidadeMaximaFila: number;
    chamadaAutomatica: boolean;
    statusGeral: string;
    mensagemPaciente: string;
    notificacoesPush: boolean;
}

export interface ConfiguracaoResponseDTO {
    id: number;
    tempoLimiteChamado: number;
    quantidadeMaximaFila: number;
    chamadaAutomatica: boolean;
    statusGeral: string;
    mensagemPaciente: string;
    notificacoesPush: boolean;
}

export const getConfiguracao = async (): Promise<ConfiguracaoResponseDTO> => {
    const response = await api.get<ConfiguracaoResponseDTO>("/configuracao");
    return response.data;
}

export const putConfiguracao = async (request: ConfiguracaoRequestDTO): Promise<ConfiguracaoResponseDTO> => {
    const response = await api.put<ConfiguracaoResponseDTO>("/configuracao", request);
    return response.data;
}