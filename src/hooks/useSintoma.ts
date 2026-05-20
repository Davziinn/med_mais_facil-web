/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { type SintomaResponseDTO, getAllSintoma, type SintomaRequestDTO, postSintoma, putSintoma, deleteSintoma } from "../service/api/sintomaService";

export const useSintoma = () => {
    const [sintomas, setSintomas] = useState<SintomaResponseDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSintomas = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllSintoma();
            setSintomas(data);
        } catch (err) {
            setError("Erro ao buscar sintomas");
        } finally {
            setLoading(false);
        }
    };

    const createSintoma = async (request: SintomaRequestDTO) => {
        setLoading(true);
        setError(null);
        try {
            const novo = await postSintoma(request);
            setSintomas(prev => [...prev, novo]);
            return novo;
        } catch (err) {
            setError("Erro ao cadastrar sintoma");
        } finally {
            setLoading(false);
        }
    };

    const updateSintoma = async (id: number, request: SintomaRequestDTO) => {
        setLoading(true);
        setError(null);
        try {
            const atualizado = await putSintoma(id, request);
            setSintomas(prev => prev.map(s => s.id === id ? atualizado : s));
            return atualizado;
        } catch (err) {
            setError("Erro ao atualizar sintoma");
        } finally {
            setLoading(false);
        }
    };

    const removeSintoma = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            await deleteSintoma(id);
            setSintomas(prev => prev.filter(s => s.id !== id));
        } catch (err) {
            setError("Erro ao deletar sintoma");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSintomas();
    }, []);

    return {
        sintomas,
        loading,
        error,
        fetchSintomas,
        createSintoma,
        updateSintoma,
        removeSintoma,
    };
};