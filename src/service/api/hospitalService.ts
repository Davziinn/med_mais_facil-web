import { api } from "./api";

export interface HospitalResponseDTO {
    id: number;
    nome: string;
    endereco: string;
    cnpj: string;
    criadoEm: Date;
    atualizadoEm: Date;
}

export const getHospitalById = async (id: number): Promise<HospitalResponseDTO> => {
    const response = await api.get(`/hospital/${id}`);
    return response.data;
}