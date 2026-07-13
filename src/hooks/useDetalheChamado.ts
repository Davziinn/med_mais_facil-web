import { useCallback, useState } from "react";
import { getDetalheChamado } from "../service/api/detalheChamadoService";
import type { DetalheChamadoUI } from "../mappers/detalheMapper";

export const useDetalheChamado = (id: number) => {
  const [detalheChamado, setDetalheChamado] = useState<DetalheChamadoUI | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  const buscarDetalheChamado = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getDetalheChamado(id);

      setDetalheChamado(data as unknown as DetalheChamadoUI);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  return {
    detalheChamado,
    setDetalheChamado,
    buscarDetalheChamado,
    loading,
  };
};
