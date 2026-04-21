import { Box, Typography } from "@mui/material"

export const HeaderFilaAtendimento = () => {
    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>Fila de Atendimento</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {/* {fila.lenght} */} 5 pacientes na fila · Tempo médio de espera: 35 min
            </Typography>
        </Box>
    )
}