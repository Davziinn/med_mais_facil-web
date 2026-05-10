import { useCallback, useEffect, useState } from "react";
import { getDetalheChamado } from "../service/api/detalheChamadoService";
import type { DetalheChamadoUI } from "../mappers/detalheMapper";

export const useDetalheChamado = (id: number) => {
  const [detalheChamado, setDetalheChamado] = useState<DetalheChamadoUI | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    buscarDetalheChamado();
  }, [buscarDetalheChamado]);

  return {
    detalheChamado,
    setDetalheChamado,
    buscarDetalheChamado,
    loading,
  };
};
