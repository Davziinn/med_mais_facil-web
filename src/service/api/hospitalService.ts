import { api } from "./api";

export type StatusHospitalResponseAPI =
  | "ATIVO"
  | "INATIVO"
  | "LOTADO"
  | "EM_MANUTENCAO";

export interface HospitalRequestDTO {
  id: number;
  nome: string;
  endereco: string;
  cnpj: string;
  cidade: string;
  estado: string;
  statusHospital: StatusHospitalResponseAPI;
}

export interface HospitalResponseDTO {
  id: number;
  nome: string;
  endereco: string;
  cnpj: string;
  cidade: string;
  estado: string;
  statusHospital: StatusHospitalResponseAPI;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface HospitalMetricasResponseDTO {
  totalHospitais: number;
  ativoHospitais: number;
  lotadoHospitais: number;
  emManutencaoHospitais: number;
}

export const postHospital = async (
  request: HospitalRequestDTO,
): Promise<HospitalResponseDTO> => {
  const response = await api.post<HospitalResponseDTO>("/hospital", request);
  return response.data;
};

export const getHospitalById = async (
  id: number,
): Promise<HospitalResponseDTO> => {
  const response = await api.get(`/hospital/${id}`);
  return response.data;
};

export const getAllHospital = async (): Promise<HospitalResponseDTO[]> => {
  const response = await api.get<HospitalResponseDTO[]>("/hospital");
  return response.data;
};

export const putHospital = async (id: number, request: HospitalRequestDTO) => {
  const response = await api.put<HospitalResponseDTO>(
    `/hospital/${id}/editar`,
    request,
  );
  return response.data;
};

export const deleteHospitalById = async (id: number) => {
  const response = await api.delete(`/hospital/${id}/deletar`);
  return response.data;
};

export const getMetricasHospitais =
  async (): Promise<HospitalMetricasResponseDTO> => {
    const response =
      await api.get<HospitalMetricasResponseDTO>("/hospital/metricas");
    return response.data;
  };
