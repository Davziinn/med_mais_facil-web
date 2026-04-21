import { Box, Grid } from "@mui/material"
import { HeaderPaciente } from "./components/HeaderPaciente"
import { CardPaciente } from "./components/CardPaciente"

export const Paciente = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <HeaderPaciente />
            <Grid container spacing={2}>
                <CardPaciente />
                <CardPaciente />
                <CardPaciente />
                <CardPaciente />
                <CardPaciente />
                <CardPaciente />
            </Grid>
        </Box>
    )
}