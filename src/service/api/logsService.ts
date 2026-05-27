import { api } from "./api";

export interface LogsAuditoriaResponseDTO {
    id: number;
    usuarioId: number | null;
    nomeUsuario: string;
    acao: string;
    modulo: string;
    detalhes: string | null;
    criadoEm: string;
}

export interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
}

export const getAllLogsAuditoria = async (
    page: number = 0,
    size: number = 20,
    usuarioId?: number,
    modulo?: string
): Promise<PageResponse<LogsAuditoriaResponseDTO>> => {
    const params: Record<string, unknown> = { page, size };
    if (usuarioId) params.usuarioId = usuarioId;
    if (modulo) params.modulo = modulo;

    const response = await api.get<PageResponse<LogsAuditoriaResponseDTO>>("/logs", { params });
    return response.data;
};