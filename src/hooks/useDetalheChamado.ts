import { useEffect, useState } from "react"
import { getDetalheChamado } from "../service/api/detalheChamadoService"
import { mapDetalheChamado, type DetalheChamadoUI } from "../mappers/detalheMapper"

export const useDetalheChamado = (id: number) => {
    const [detalheChamado, setDetalheChamado] = useState<DetalheChamadoUI | null>(null)

    const carregarDetalheChamado = async (id: number) => {
        try {
            const data = await getDetalheChamado(id);

            const mappedData: DetalheChamadoUI = {
                ...data,
                prioridadeChamado: mapDetalheChamado(data.prioridadeChamado)
            }

            setDetalheChamado(mappedData)
        } catch (error) {
            console.error("Erro ao carregar detalhe do chamado:", error)
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        carregarDetalheChamado(id)
    }, [id])

    return {
        detalheChamado, 
        carregarDetalheChamado
    }
}