import { useEffect, useState } from "react"
import { getFilaAtendimento } from "../service/api/filaAtendimento"
import { mapPrioridadeChamado, type FilaAtendimentoUI } from "../mappers/filaMapper"

export const useFilaAtendimento = () => {
    const [filaAtendimento, setFilaAtendimento] = useState<FilaAtendimentoUI[]>([])

    const carregarFilaAtendimento = async () => {
        try {
            const data = await getFilaAtendimento()

            const mappedData: FilaAtendimentoUI[] = data.map((item) => {
                return {
                    ...item,
                    prioridadeChamado: mapPrioridadeChamado(item.prioridadeChamado),
                }
            }) 
            
            setFilaAtendimento(mappedData)
        } catch (error) {
            console.error("Erro ao carregar fila de atendimento:", error)
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        carregarFilaAtendimento()
    },[])
    
    return {
        filaAtendimento,
        carregarFilaAtendimento
    }
}