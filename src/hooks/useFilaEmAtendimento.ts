import { useState } from "react";
import {
  getFilaEmAtendimento,
  type FilaEmAtendimentoResponseDTO,
} from "../service/api/filaEmAtendimentoService";

export const useFilaEmAtendimento = () => {
  const [filaEmAtendimento, setFilaEmAtendimento] = useState<
    FilaEmAtendimentoResponseDTO[]
  >([]);
  const carregarFilaEmAtendimento = async () => {
    try {
      const data = await getFilaEmAtendimento();
      setFilaEmAtendimento(data);
    } catch (error) {
      console.error("Erro ao carregar a fila em atendimento:", error);
    }
  };
  return { filaEmAtendimento, carregarFilaEmAtendimento };
};
