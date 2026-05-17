import { putEncaminharChamadoParaEspecialidade, type EncaminharChamadoRequestDTO } from "../service/api/encaminharChamadoService"

export const useEncaminharChamado = () => {
    const encaminharChamado = async (chamadoId: number, request: EncaminharChamadoRequestDTO) => {
        try {
            const data = putEncaminharChamadoParaEspecialidade(chamadoId, request)
            return data
        } catch (error) {
            console.error("Erro ao encaminhar chamado", error)
        }
    } 

    return {
        encaminharChamado
    }
}