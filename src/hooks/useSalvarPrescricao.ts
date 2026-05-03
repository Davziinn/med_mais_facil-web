import { salvarPrescricaoMedica, type PrescricaoRequestDTO } from "../service/api/prescricaoService"

export const useSalvarPrescricao = () => {
    const salvarPrescricao = async (atendimentoId: number, request: PrescricaoRequestDTO) => {
        try {
            const response = await salvarPrescricaoMedica(atendimentoId, request)
            return response
        } catch (error) {
                console.error("Erro ao salvar prescrição médica:", error);
                throw error;
        }
    }
    
    return { salvarPrescricao }
}