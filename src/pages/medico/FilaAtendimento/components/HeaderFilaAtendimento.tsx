import { Box, Typography } from "@mui/material"

type HeaderFilaAtendimentoProps = {
    totalPacientes: number
}

export const HeaderFilaAtendimento = ({ totalPacientes }: HeaderFilaAtendimentoProps) => {
    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>Fila de Atendimento</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {totalPacientes} pacientes na fila · Tempo médio de espera: 35 min
            </Typography>
        </Box>
    )
}