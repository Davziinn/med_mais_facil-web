import { useState } from "react";
import { getAllGuiaMedicaByAtendimentoId, patchGuiaMedica, postGuiaMedica as postGuiaMedicaService, putGuiaMedica, type GuiaMedicaRequestDTO, type GuiaMedicaResponseDTO } from "../service/api/guiaMedicaService";

export const useGuiaMedica = () => {
    const [guiasMedicas, setGuiasMedicas] = useState<GuiaMedicaResponseDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const carregarGuiasMedicas = async (atendimentoId: number) => {
        setLoading(true);
        setError(null);

        try {
            const data = await getAllGuiaMedicaByAtendimentoId(atendimentoId);
            setGuiasMedicas(data);
        } catch (error) {
            console.error("Erro ao carregar guias médicas", error);
            setError("Erro ao carregar guias médicas");
        } finally {
            setLoading(false);
        }
    }

    const cadastrarGuiaMedica = async (request: GuiaMedicaRequestDTO) => {
        try {
            const novaGuia = await postGuiaMedicaService(request);
            setGuiasMedicas((prev) => [...prev, novaGuia]);
            return novaGuia;
        } catch (error) {
            console.error("Erro ao cadastrar guia médica", error);
            setError("Erro ao cadastrar guia médica");
            throw error;
        }
    }

    const editarGuiaMedica = async (id: number, request: GuiaMedicaRequestDTO) => {
        try {
            const guiaAtualizada = await putGuiaMedica(id, request); 
            setGuiasMedicas((prev) => prev.map((guia) => (guia.id === id ? guiaAtualizada : guia)));
            return guiaAtualizada;
        } catch (error) {
            console.error("Erro ao editar guia médica", error);
            setError("Erro ao editar guia médica");
            throw error;
        }
    }

    const cancelarGuiaMedica = async (id: number) => {
        try {
            const guiaCancelada = await patchGuiaMedica(id); 
            setGuiasMedicas((prev) => prev.map((guia) => (guia.id === id ? guiaCancelada : guia)));
            return guiaCancelada;
        }
        catch (error) {
            console.error("Erro ao cancelar guia médica", error);
            setError("Erro ao cancelar guia médica");
            throw error;
        }
    }

    return {
        guiasMedicas,
        loading,
        error,
        carregarGuiasMedicas,
        cadastrarGuiaMedica,
        editarGuiaMedica,
        cancelarGuiaMedica
    };
}