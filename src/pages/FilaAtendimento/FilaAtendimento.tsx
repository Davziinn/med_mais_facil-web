import { Box, Card } from "@mui/material"
import { HeaderFilaAtendimento } from "./components/HeaderFilaAtendimento"
import { TabelaFilaAtendimento } from "./components/TabelaFilaAtendimento"

export const FilaAtendimento = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <HeaderFilaAtendimento />
            <Card>
                <TabelaFilaAtendimento/>
            </Card>
        </Box>
    )
}