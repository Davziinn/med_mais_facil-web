import { Box, Card } from "@mui/material"
import { HeaderFilaAtendimento } from "./components/HeaderFilaAtendimento"
import { TabelaFilaAtendimento } from "./components/TabelaFilaAtendimento"
import { useFilaAtendimento } from "../../hooks/useFilaAtendimento"

export const FilaAtendimento = () => {
    const { filaAtendimento } = useFilaAtendimento();

    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    
            <HeaderFilaAtendimento totalPacientes={filaAtendimento.length} />
            <Card>
                <TabelaFilaAtendimento/>
            </Card>
        </Box>
    )
}