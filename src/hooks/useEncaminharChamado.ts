import { putEncaminharChamadoParaEspecialidade, type EncaminharChamadoRequestDTO } from "../service/api/encaminharChamadoService"
export const useEncaminharChamado = () => {
    
    const encaminharChamado = async (chamadoId: number, request: EncaminharChamadoRequestDTO) => {
        const data = await putEncaminharChamadoParaEspecialidade(chamadoId, request)
        return data
    }

    return {
        encaminharChamado
    }
}