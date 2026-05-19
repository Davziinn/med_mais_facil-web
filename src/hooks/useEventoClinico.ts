/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import { type EventoClinicoResponseDTO, getAllEventoClinico, type EventoClinicoRequestDTO, postEventoClinico, putEventoClinico, deleteEventoClinico } from "../service/api/eventoClinicoService";

export const useEventoClinico = () => {
  const [eventos, setEventos] = useState<EventoClinicoResponseDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEventos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllEventoClinico();
      setEventos(data as unknown as EventoClinicoResponseDTO[]);
    } catch (err) {
      setError("Erro ao buscar eventos clínicos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEventos();
  }, [fetchEventos]);

  const criarEvento = useCallback(async (request: EventoClinicoRequestDTO) => {
    setLoading(true);
    setError(null);
    try {
      const novo = await postEventoClinico(request);
      setEventos((prev) => [...prev, novo]);
      return novo;
    } catch (err) {
      setError("Erro ao criar evento clínico.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const editarEvento = useCallback(
    async (id: number, request: EventoClinicoRequestDTO) => {
      setLoading(true);
      setError(null);
      try {
        const atualizado = await putEventoClinico(id, request);
        setEventos((prev) =>
          prev.map((e) => (e.id === id ? atualizado : e))
        );
        return atualizado;
      } catch (err) {
        setError("Erro ao editar evento clínico.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deletarEvento = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteEventoClinico(id);
      setEventos((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      setError("Erro ao deletar evento clínico.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    eventos,
    loading,
    error,
    fetchEventos,
    criarEvento,
    editarEvento,
    deletarEvento,
  };
};