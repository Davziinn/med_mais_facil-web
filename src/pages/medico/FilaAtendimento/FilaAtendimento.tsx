import { Box, Card } from "@mui/material"
import { HeaderFilaAtendimento } from "./components/HeaderFilaAtendimento"
import { TabelaFilaAtendimento } from "./components/TabelaFilaAtendimento"
import { useFilaEspera } from "../../../hooks/useFilaEspera";

export const FilaAtendimento = () => {
    const { filaEsperaEspecialidadeMedico } = useFilaEspera();

    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    
            <HeaderFilaAtendimento totalPacientes={filaEsperaEspecialidadeMedico.length} />
            <Card>
                <TabelaFilaAtendimento/>
            </Card>
        </Box>
    )
}