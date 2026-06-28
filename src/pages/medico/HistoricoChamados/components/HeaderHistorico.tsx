import { Box, Typography } from "@mui/material"

export const HeaderHistorico = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2 }}>
            <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Histórico de Atendimentos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Consulte atendimentos finalizados e cancelados, com diagnósticos e produtividade
                </Typography>
            </Box>
        </Box>
    )
}