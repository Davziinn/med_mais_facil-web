import { useEffect, useState } from "react"
import { getAllEspecialidades, type EspecialidadeMedicoResponseDTO } from "../service/api/especialidadeService"

export const useEspecialidade = () => {
    const [especialidades, setEspecialidades] = useState<EspecialidadeMedicoResponseDTO[] | []>([])

    const carregarEspecialidades = async () => {
        try {
            const data = await getAllEspecialidades()
            setEspecialidades(data)
        } catch (error) {
            console.error("Erro ao carregar especialidades", error)
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        carregarEspecialidades()
    }, [])

    return {
        especialidades,
        carregarEspecialidades
    }
}