import { useState } from "react";
import { postIniciarAtendimento } from "../service/api/iniciarAtendimentoService";

export const useIniciarAtendimento = () => {
  const [error, setError] = useState<string | null>(null);

  const iniciarAtendimento = async (chamadoId: number, medicoId: number) => {
    setError(null);

    try {
      const data = await postIniciarAtendimento({ chamadoId, medicoId });
      return data;
    } catch (err) {
      setError("Erro ao iniciar atendimento");
      console.error(err);
    }
  };

  return {
    iniciarAtendimento,
    error
  }
};
