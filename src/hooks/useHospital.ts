/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";
import {
  deleteHospitalById,
  getAllHospital,
  getMetricasHospitais,
  postHospital,
  putHospital,
  type HospitalMetricasResponseDTO,
  type HospitalRequestDTO,
  type HospitalResponseDTO,
} from "../service/api/hospitalService";

export const useHospitais = () => {
  const [hospitais, setHospitais] = useState<HospitalResponseDTO[]>([]);
  const [metricas, setMetricas] = useState<HospitalMetricasResponseDTO | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [loadingMetricas, setLoadingMetricas] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregarHospitais = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllHospital();
      setHospitais(data);
    } catch (err) {
      console.error("Erro ao carregar hospitais:", err);
      setError("Falha ao carregar hospitais.");
    } finally {
      setLoading(false);
    }
  }, []);

  const carregarMetricas = useCallback(async () => {
    setLoadingMetricas(true);
    try {
      const data = await getMetricasHospitais();
      setMetricas(data);
    } catch (err) {
      console.error("Erro ao carregar métricas:", err);
    } finally {
      setLoadingMetricas(false);
    }
  }, []);

  const criarHospital = useCallback(
    async (request: HospitalRequestDTO): Promise<HospitalResponseDTO> => {
      const novo = await postHospital(request);
      setHospitais((prev) => [novo, ...prev]);
      return novo;
    },
    [],
  );

  const atualizarHospital = useCallback(
    async (
      id: number,
      request: HospitalRequestDTO,
    ): Promise<HospitalResponseDTO> => {
      const atualizado = await putHospital(id, request);
      setHospitais((prev) => prev.map((h) => (h.id === id ? atualizado : h)));
      return atualizado;
    },
    [],
  );

  const removerHospital = useCallback(async (id: number): Promise<void> => {
    await deleteHospitalById(id);
    setHospitais((prev) => prev.filter((h) => h.id !== id));
  }, []);

  useEffect(() => {
    Promise.all([carregarHospitais(), carregarMetricas()]);
  }, []);

  return {
    hospitais,
    metricas,
    loading,
    loadingMetricas,
    error,
    carregarHospitais,
    carregarMetricas,
    criarHospital,
    atualizarHospital,
    removerHospital,
  };
};
