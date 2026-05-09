import { Box, Card } from "@mui/material"
import { HeaderFilaAtendimento } from "./components/HeaderFilaAtendimento"
import { TabelaFilaAtendimento } from "./components/TabelaFilaAtendimento"
import { useFilaEspera } from "../../../hooks/useFilaEspera";

export const FilaAtendimento = () => {
    const { filaEspera } = useFilaEspera();

    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    
            <HeaderFilaAtendimento totalPacientes={filaEspera.length} />
            <Card>
                <TabelaFilaAtendimento/>
            </Card>
        </Box>
    )
}