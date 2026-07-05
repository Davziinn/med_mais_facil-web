/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import {
    deleteExame,
  getAllExames,
  getAllExamesAtivos,
  postExame,
  putExame,
  type ExameResponseDTO,
} from "../service/api/exameService";

export const useExame = () => {
  const [exames, setExames] = useState<ExameResponseDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregarExames = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAllExames();
      setExames(data);
    } catch (err) {
      console.error("Erro ao carregar exames", err);
      setError("Erro ao carregar exames");
    } finally {
      setLoading(false);
    }
  };
  
  const carregarExamesAtivos = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAllExamesAtivos();
      setExames(data);
    } catch (err) {
      console.error("Erro ao carregar exames", err);
      setError("Erro ao carregar exames");
    } finally {
      setLoading(false);
    }
  };

  const cadatrarExame = async (request: ExameResponseDTO) => {
    const nova = await postExame(request);
    setExames((prev) => [...prev, nova]);
    return nova;
  };

  const editarExame = async (id: number, request: ExameResponseDTO) => {
    const atualizada = await putExame(id, request);
    setExames((prev) => prev.map((exame) => (exame.id === id ? atualizada : exame)));
    return atualizada;
  };

  const removerExame = async (id: number) => {
    await deleteExame(id);
    setExames((prev) => prev.filter((exame) => exame.id !== id));
  };

  useEffect(() => {
      carregarExames();
    }, []);

  return {
    exames,
    loading,
    error,
    carregarExames,
    cadatrarExame,
    editarExame,
    removerExame,
    carregarExamesAtivos,
  };
};
