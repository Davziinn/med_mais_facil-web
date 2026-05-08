import { useCallback, useState } from "react";

import {
  getProntuarioPaciente,
  type ProntuarioPacienteResponseDTO,
} from "../service/api/prontuarioService";

export const useProntuario = () => {
  const [prontuario, setProntuario] =
    useState<ProntuarioPacienteResponseDTO | null>(null);

  const carregarProntuario = useCallback(
    async (pacienteId: number) => {
      try {
        const data = await getProntuarioPaciente(pacienteId);

        setProntuario(data);
      } catch (error) {
        console.error("Erro ao buscar prontuário:", error);
      }
    },
    []
  );

  return {
    prontuario,
    carregarProntuario,
  };
};