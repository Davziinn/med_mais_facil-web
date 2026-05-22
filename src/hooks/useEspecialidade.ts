/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import {
  getAllEspecialidades,
  postEspecialidade,
  putEspecialidades,
  deleteEspecialidades,
  type EspecialidadeMedicoRequestDTO,
  type EspecialidadeMedicoResponseDTO,
} from "../service/api/especialidadeService";

export const useEspecialidade = () => {
  const [especialidades, setEspecialidades] = useState<EspecialidadeMedicoResponseDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregarEspecialidades = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllEspecialidades();
      setEspecialidades(data);
    } catch (err) {
      console.error("Erro ao carregar especialidades", err);
      setError("Erro ao carregar especialidades");
    } finally {
      setLoading(false);
    }
  };

  const criarEspecialidade = async (request: EspecialidadeMedicoRequestDTO) => {
    const nova = await postEspecialidade(request);
    setEspecialidades((prev) => [...prev, nova]);
    return nova;
  };

  const editarEspecialidade = async (id: number, request: EspecialidadeMedicoRequestDTO) => {
    const atualizada = await putEspecialidades(id, request);
    setEspecialidades((prev) =>
      prev.map((esp) => (esp.id === id ? atualizada : esp))
    );
    return atualizada;
  };

  const removerEspecialidade = async (id: number) => {
    await deleteEspecialidades(id);
    setEspecialidades((prev) => prev.filter((esp) => esp.id !== id));
  };

  useEffect(() => {
    carregarEspecialidades();
  }, []);

  return {
    especialidades,
    loading,
    error,
    carregarEspecialidades,
    criarEspecialidade,
    editarEspecialidade,
    removerEspecialidade,
  };
};